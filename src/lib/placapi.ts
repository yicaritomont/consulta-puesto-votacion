import 'server-only';
import type { LookupResponse } from '@/types/voting';

const mockSuccess: LookupResponse = { ok:true, data:{ department:'Tolima', municipality:'Ibagué', place:'Institución Educativa San Simón', table:'12', address:'Cra. 5 # 19-32, Ibagué, Tolima', mapsUrl:'https://www.google.com/maps/search/?api=1&query=Institucion+Educativa+San+Simon+Ibague' } };

export async function lookupVotingPlace(document:string):Promise<LookupResponse>{
  if (!/^\d{6,12}$/.test(document)) return {ok:false,code:'INVALID_REQUEST',message:'Ingresa un número de cédula válido.'};
  if ((process.env.VOTING_API_MODE ?? 'mock') === 'mock') {
    await new Promise(r=>setTimeout(r,1200));
    if (document.endsWith('00')) return {ok:false,code:'NOT_FOUND',message:'No encontramos un puesto de votación asociado al número ingresado.'};
    if (document.endsWith('99')) return {ok:false,code:'SERVICE_UNAVAILABLE',message:'El servicio de consulta no está disponible temporalmente.'};
    return mockSuccess;
  }
  const apiKey=process.env.PLACAPI_API_KEY;
  if(!apiKey) return {ok:false,code:'SERVICE_UNAVAILABLE',message:'La integración no está configurada.'};
  try {
    const res=await fetch(process.env.PLACAPI_URL ?? 'https://placapi.com/api/puesto-votacion',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${apiKey}`},body:JSON.stringify({docType:'CC',docNumber:document}),cache:'no-store'});
    if(res.status===404) return {ok:false,code:'NOT_FOUND',message:'No encontramos un puesto de votación asociado al número ingresado.'};
    if(res.status===429) return {ok:false,code:'RATE_LIMITED',message:'Hay demasiadas consultas. Intenta nuevamente en unos minutos.'};
    if(!res.ok) return {ok:false,code:'SERVICE_UNAVAILABLE',message:'No pudimos realizar la consulta en este momento.'};
    const raw=await res.json();
    const d=raw.data ?? raw;
    return {ok:true,data:{department:d.departamento ?? d.department ?? '',municipality:d.municipio ?? d.municipality ?? '',place:d.puesto ?? d.place ?? '',table:String(d.mesa ?? d.table ?? ''),address:d.direccion ?? d.address ?? '',mapsUrl:d.ubicacion?.mapsUrl ?? d.mapsUrl}};
  } catch { return {ok:false,code:'SERVICE_UNAVAILABLE',message:'No pudimos conectarnos con el servicio de consulta.'}; }
}

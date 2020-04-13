## Update: I found a workaround and get it to work.

## src/lib/api/Google.ts:61:49 - error TS2339: Property 'asPromise' does not exist on type 'RequestHandle<GeocodingResponse<GeocodingResponseStatus>>'.

## const res = await maps.geocode({ address }).asPromise()

### It seems @googel/map was refactored and becomes @googlemaps/google-maps-services-js so API signature is different. There are some mismatch in typescript definitions.

### I removed async/await and wrote something like

### maps.geocode({address}, (res) => {

### console.log(res)

### })

### And I can see the json object with all info

### But when I tried to access res.json, it complained json is not part of type.

### I tried google-maps-services-js, but it has problems with typescipt too.

### I tried renaming Google.ts so it won't check typescript, but webpack doesn't like it and throw erros.

### Please just let me know the verions of @google/maps and @types/googel\_\_maps you use that works in the lecture. I really don't care the new API.

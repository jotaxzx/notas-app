

export const useFileUpload = async (file) => {


    if(!file) throw Error('No existen archivos para subir');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dxyra3fkm/upload'

    // la forma de enviar archivos
    const formData = new FormData();
    formData.append('upload_preset', 'react-notes');
    formData.append('file', file);


    try {
        
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })

        if (!resp.ok) throw new Error('Error al intentar subir archivo');

        const cloudResp = await resp.json();

        // console.log(cloudResp);
                // esta seria la url donde quedo guardada la iamgen
        return cloudResp.secure_url;
        

    } catch (error) {
        throw new Error(`ocurrio un error: ${error}`)
    }
}

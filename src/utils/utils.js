
export const getCountry = () => {
    const splits = window.location.hostname.split('.');
    const country = splits[splits.length - 1];
    return splits.length === 1 ? 'py' : country;
}

export const convertDataToFile = async (url, filename, fn, mimeType= 'image/jpeg') => {
    return (fetch(url)
        .then((res) => {
            return res.arrayBuffer();})
        .then((buf) => {
            let formData = new FormData();
            formData.append('region', getCountry());
            formData.append('msisdn', 123456789);
            formData.append(filename, new File([buf], `${filename}.jpg`, {type:mimeType}));
            formData.append('code', 1234);
            return fn(formData);
}))}
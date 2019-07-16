import ApiUtils from '../api/ApiUtils';

export default class PdfUtils {

    static downloadPDF(url, fileName){
        ApiUtils.makeAjaxRequest({
            url: `${url}`,
            method: 'GET',
            isRaw: true
        }, (res) => {
            let blob = new Blob([res.text], { type: 'application/pdf' });
            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                //IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                window.navigator.msSaveBlob(blob, fileName);
            } else {
                const data = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = data;
                link.download = fileName;
                document.body.appendChild(link);
                link.target = '_blank';
                link.click();
            }
        });
    }
}
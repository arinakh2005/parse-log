function readFile(input) {
    let recordsInFileFromUser = [];
    let fileFromUser = input.files[0];
    let reader = new FileReader();
    reader.readAsText(fileFromUser);

    reader.onload = function () {
        let contentInTXTFileFromUser = reader.result.split("\n").map(function(x) {
            return x.split(",");
        });

        for (let line of contentInTXTFileFromUser){
            let data = {
                remoteAddr: line.toString().match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g).toString(),
                time: line.toString().match(/\d{1,2}\/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\/\d{4}\:[0-2][0-3]:[0-5][0-9]\:([0-5][0-9])\s\+\d{4}/g).toString(),
                method: line.toString().match(/(GET|POST|PUT|DELETE)/g).toString(),
                path: line.toString().match(/\s\/.*?\s/g).toString().replaceAll(" ", ""),
                version: line.toString().match(/HTTP\/\d.\d/g).toString(),
                response: line.toString().match(/\s\d{3}\s/g).toString().replaceAll(" ", ""),
                bytes: line.toString().match(/\d{1,10}\s"/g).toString().slice(0,-2),
                userAgent: line.toString().match(/"[A-Z][a-z].{1,100}"/g).toString().replaceAll("\"", "")
            }
            let jsonLine = JSON.stringify(data);
            recordsInFileFromUser.push(JSON.parse(jsonLine));
        }
        const jsonFile = new Blob(
            [JSON.stringify(recordsInFileFromUser)], {
                type: 'application/json'
            }
        )

        const linkForDownloadingJsonFile = document.createElement('a');
        linkForDownloadingJsonFile.setAttribute('href', URL.createObjectURL(jsonFile));
        linkForDownloadingJsonFile.setAttribute('download', 'data.json');
        linkForDownloadingJsonFile.textContent = 'Завантажити файл формату.json';
        document.getElementsByClassName('main')[0].appendChild(linkForDownloadingJsonFile);
    };

    reader.onerror = function () {
        console.log(reader.error);
    };
}


function readFile(input) {
    let recordsInFileFromUser = [];
    let fileFromUser = input.files[0];
    let reader = new FileReader();
    reader.readAsText(fileFromUser);

    reader.onload = function () {
        let contentInTXTFileFromUser = reader.result.split("\n").map(function (x) {
            return x.split(",");
        });

        for (let line of contentInTXTFileFromUser) {
            if(line.toString().match(/\[WARN\]/gm)) {
                let data = {
                    time: line.toString().match(/\d{4}-\d{2}-\d{2} ([0-2][0-9]):([0-5][0-9]):([0-5][0-9])/gm).toString(),
                    level: line.toString().match(/\[[A-Z]*/gm).toString().slice(1),
                    message: line.toString().match(/\"[A-Z](.+)\"/gm).toString().slice(1).slice(0,-1)
                }
                let jsonLine = JSON.stringify(data);
                recordsInFileFromUser.push(JSON.parse(jsonLine));
            }
        }

        const jsonFile = new Blob(
            [JSON.stringify(recordsInFileFromUser)], {
                type: 'application/json'
            }
        )

        const linkForDownloadingJsonFile = document.createElement('a');
        linkForDownloadingJsonFile.setAttribute('href', URL.createObjectURL(jsonFile));
        linkForDownloadingJsonFile.setAttribute('download', 'data.json');
        linkForDownloadingJsonFile.textContent = 'Завантажити файл з WARNING формату .json';
        document.getElementsByClassName('main')[0].appendChild(linkForDownloadingJsonFile);
    };

    reader.onerror = function () {
        console.log(reader.error);
    };
}


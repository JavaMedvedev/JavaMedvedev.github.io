function compareAndDownload() {
    var file1 = document.getElementById('file1').files[0];
    var file2 = document.getElementById('file2').files[0];

    if (file1 && file2) {
        // Read first file
        var reader1 = new FileReader();
        reader1.onload = function(e) {
            var data1 = new Uint8Array(e.target.result);
            var workbook1 = XLSX.read(data1, { type: 'array' });
            // Fill empty cells as empty strings
            var sheet1 = XLSX.utils.sheet_to_json(
                workbook1.Sheets[workbook1.SheetNames[0]],
                { header: 1, defval: "" }
            );

            // Read second file
            var reader2 = new FileReader();
            reader2.onload = function(e) {
                var data2 = new Uint8Array(e.target.result);
                var workbook2 = XLSX.read(data2, { type: 'array' });
                var sheet2 = XLSX.utils.sheet_to_json(
                    workbook2.Sheets[workbook2.SheetNames[0]],
                    { header: 1, defval: "" }
                );

                // Compare sheets based on Application Number column
                var keyColumnName = 'Application Number';
                var keyIndex1 = findKeyColumnIndex(sheet1[0], keyColumnName);
                var keyIndex2 = findKeyColumnIndex(sheet2[0], keyColumnName);

                if (keyIndex1 !== -1 && keyIndex2 !== -1) {
                    var uniqueRows = findUniqueRows(sheet1, sheet2, keyIndex1, keyIndex2);
                    var csvData = XLSX.utils.sheet_to_csv(XLSX.utils.aoa_to_sheet(uniqueRows));

                    var blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
                    var a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = 'unique_students.csv';
                    a.style.display = 'none';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(a.href);
                } else {
                    alert('Could not find the Application Number column in one or both sheets.');
                }
            };
            reader2.readAsArrayBuffer(file2);
        };
        reader1.readAsArrayBuffer(file1);
    } else {
        alert('Please upload both files.');
    }
}

function findKeyColumnIndex(headerRow, keyColumnName) {
    var target = keyColumnName.toLowerCase().trim();
    for (var i = 0; i < headerRow.length; i++) {
        // Safely convert any empty or non-string cell to string
        var cell = headerRow[i] == null ? '' : String(headerRow[i]);
        if (cell.toLowerCase().trim() === target) {
            return i;
        }
    }
    return -1;
}

function findUniqueRows(data1, data2, keyIndex1, keyIndex2) {
    var header = data2[0];
    var data1Keys = new Set();
    var uniqueRows = [header];

    for (var i = 1; i < data1.length; i++) {
        var key = data1[i][keyIndex1];
        if (key) data1Keys.add(key);
    }
    for (var j = 1; j < data2.length; j++) {
        var key2 = data2[j][keyIndex2];
        if (key2 && !data1Keys.has(key2)) {
            uniqueRows.push(data2[j]);
        }
    }
    return uniqueRows;
}

function clearFileInputs() {
    document.getElementById('file1').value = null;
    document.getElementById('file2').value = null;
}

function animateButton(button) {
    button.style.transition = 'transform 0.1s ease';
    button.style.transform = 'scale(0.95)';
    setTimeout(function() {
        button.style.transform = 'scale(1)';
    }, 100);
}

document.querySelector('button').addEventListener('click', function(event) {
    animateButton(event.target);
    // ensure the compareAndDownload is triggered as well
    if (typeof compareAndDownload === 'function') {
        compareAndDownload();
    }
});

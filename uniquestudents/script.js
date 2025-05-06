function compareAndDownload() {
    var file1 = document.getElementById('file1').files[0];
    var file2 = document.getElementById('file2').files[0];

    if (file1 && file2) {
        // Read first file
        var reader1 = new FileReader();
        reader1.onload = function(e) {
            var data1 = new Uint8Array(e.target.result);
            var workbook1 = XLSX.read(data1, { type: 'array' });
            var sheet1 = XLSX.utils.sheet_to_json(workbook1.Sheets[workbook1.SheetNames[0]], { header: 1 });

            // Read second file
            var reader2 = new FileReader();
            reader2.onload = function(e) {
                var data2 = new Uint8Array(e.target.result);
                var workbook2 = XLSX.read(data2, { type: 'array' });
                var sheet2 = XLSX.utils.sheet_to_json(workbook2.Sheets[workbook2.SheetNames[0]], { header: 1 });

                // Now that we have both sheets, we can compare them
                var keyColumnName1 = 'Application Number';
                var keyColumnName2 = 'Application Number';

                var keyIndex1 = findKeyColumnIndex(sheet1[0], keyColumnName1);
                var keyIndex2 = findKeyColumnIndex(sheet2[0], keyColumnName2);

                if (keyIndex1 !== -1 && keyIndex2 !== -1) {
                    var uniqueRows = findUniqueRows(sheet1, sheet2, keyIndex1, keyIndex2);

                    var csvData = XLSX.utils.sheet_to_csv(XLSX.utils.aoa_to_sheet(uniqueRows));

                    var blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

                    var a = document.createElement("a");
                    a.href = URL.createObjectURL(blob);
                    a.download = "unique_students.csv";
                    a.style.display = "none";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                } else {
                    alert('Could not find the key column in one or both sheets.');
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
    keyColumnName = keyColumnName.toLowerCase().trim();
    for (var i = 0; i < headerRow.length; i++) {
        if (headerRow[i].toLowerCase().trim() === keyColumnName) {
            return i;
        }
    }
    return -1; // Return -1 if the column is not found
}

function findUniqueRows(data1, data2, keyIndex1, keyIndex2) {
    // Use the header from the second file
    var header2 = data2[0];
    var data1Keys = new Set();
    var uniqueRows = [header2];

    // Collect all keys from the first sheet
    for (var i = 1; i < data1.length; i++) {
        var key1 = data1[i][keyIndex1];
        if (key1) data1Keys.add(key1);
    }

    // Add only those rows from sheet2 whose key is NOT in sheet1
    for (var j = 1; j < data2.length; j++) {
        var key2 = data2[j][keyIndex2];
        if (key2 && !data1Keys.has(key2)) {
            uniqueRows.push(data2[j]);
        }
    }

    return uniqueRows;
}

function clearFileInputs() {
    // Set the file input values to null to clear them on page load
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
});

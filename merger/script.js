function mergeAndDownload() {
    var file1 = document.getElementById('file1').files[0];
    var file2 = document.getElementById('file2').files[0];

    if (file1 && file2) {
        Papa.parse(file1, {
            complete: function(result1) {
                Papa.parse(file2, {
                    complete: function(result2) {
                        var keyColumnName1 = findKeyColumnName(result1.data[0]);
                        var keyColumnName2 = findKeyColumnName(result2.data[0]);

                        if (keyColumnName1 && keyColumnName2) {
                            var mergedData = mergeData(result1.data, result2.data, keyColumnName1, keyColumnName2);

                            // Remove columns with no data
                            mergedData = removeEmptyColumns(mergedData);

                            // Add column names
                            mergedData = addColumnNames(mergedData);

                            var csvData = Papa.unparse(mergedData);

                            var blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

                            // Trigger download
                            var a = document.createElement("a");
                            a.href = URL.createObjectURL(blob);
                            a.download = "merged.csv";
                            a.style.display = "none";
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                        } else {
                            alert('Could not find the key column in one or both sheets.');
                        }
                    }
                });
            }
        });
    } else {
        alert('Please upload both files.');
    }
}


function findKeyColumnName(row) {
    var possibleKeyColumnNames = ['Student SIS ID', 'SIS User ID'];
    
    for (var i = 0; i < possibleKeyColumnNames.length; i++) {
        var index = row.indexOf(possibleKeyColumnNames[i]);
        if (index !== -1) {
            return index;
        }
    }
    
    return null;
}

function mergeData(data1, data2, keyIndex1, keyIndex2) {
    var mergedData = [];

    // Select only the desired columns
    var selectedColumns = ['Student name', 'SIS Login ID', 'Email'];

    // Find the indices of the selected columns in both datasets
    var indices1 = [];
    var indices2 = [];
    
    for (var i = 0; i < selectedColumns.length; i++) {
        indices1.push(data1[0].indexOf(selectedColumns[i]));
        indices2.push(data2[0].indexOf(selectedColumns[i]));
    }

    // Iterate through the rows of both datasets
    for (var i = 1; i < data1.length; i++) {
        var key1 = data1[i][keyIndex1];
        for (var j = 1; j < data2.length; j++) {
            var key2 = data2[j][keyIndex2];
            if (key1 === key2) {
                var row = [];
                for (var k = 0; k < selectedColumns.length; k++) {
                    row.push(data1[i][indices1[k]]);
                    row.push(data2[j][indices2[k]]);
                }
                mergedData.push(row);
            }
        }
    }

    return mergedData;
}

function removeEmptyColumns(data) {
    var nonEmptyColumns = [];

    // Iterate through the columns
    for (var i = 0; i < data[0].length; i++) {
        var hasData = false;

        // Check if any row in the column has data
        for (var j = 1; j < data.length; j++) {
            if (data[j][i]) {
                hasData = true;
                break;
            }
        }

        if (hasData) {
            nonEmptyColumns.push(i);
        }
    }

    // Create a new dataset with non-empty columns
    var newData = data.map(function(row) {
        return row.filter(function(_, index) {
            return nonEmptyColumns.includes(index);
        });
    });

    return newData;
}

function addColumnNames(data) {
    var columnNames = ['Student name', 'Student ID', 'Email'];

    // Insert the column names at the beginning of the dataset
    data.unshift(columnNames);

    return data;
}

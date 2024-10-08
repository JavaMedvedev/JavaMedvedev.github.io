function mergeAndDownload() {
    var file1 = document.getElementById('file1').files[0]; // Roster (optional)
    var file2 = document.getElementById('file2').files[0]; // Quiz (mandatory)
    var file3 = document.getElementById('file3').files[0]; // Gradebook (optional)

    if (!file2) {
        alert('The quiz file is required!');
        return;
    }

    // Ensure at least one optional file is provided
    if (!file1 && !file3) {
        alert('Please upload at least one of the optional files: roster or gradebook.');
        return;
    }

    // Parse the quiz file (mandatory)
    Papa.parse(file2, {
        complete: function(result2) {
            // Parse the roster (if provided)
            if (file1) {
                Papa.parse(file1, {
                    complete: function(result1) {
                        // Parse the gradebook (if provided)
                        if (file3) {
                            Papa.parse(file3, {
                                complete: function(result3) {
                                    // Merge all three files (quiz, roster, and gradebook)
                                    var mergedData = mergeDataWithOptionalFiles(result1.data, result2.data, result3.data);
                                    downloadMergedCSV(mergedData);
                                }
                            });
                        } else {
                            // Merge quiz and roster only (no gradebook)
                            var mergedData = mergeDataWithOptionalFiles(result1.data, result2.data, null);
                            downloadMergedCSV(mergedData);
                        }
                    }
                });
            } else if (file3) {
                // If no roster, merge quiz and gradebook only
                Papa.parse(file3, {
                    complete: function(result3) {
                        var mergedData = mergeDataWithOptionalFiles(null, result2.data, result3.data);
                        downloadMergedCSV(mergedData);
                    }
                });
            }
        }
    });
}

// Function to merge based on the available files
function mergeDataWithOptionalFiles(rosterData, quizData, gradebookData) {
    var mergedData = [];

    var quizHeader = quizData[0];
    var nameIndex = quizHeader.indexOf('Student name');

    // Prepare merged header
    var mergedHeader = [...quizHeader.slice(0, nameIndex + 1)];

    // Add optional columns based on the available files
    if (rosterData) {
        mergedHeader.push('Email');
    }
    if (gradebookData) {
        mergedHeader.push('SIS Login ID');
    }
    mergedHeader.push(...quizHeader.slice(nameIndex + 1));
    mergedData.push(mergedHeader);

    // Merge rows
    for (var i = 1; i < quizData.length; i++) {
        var quizRow = quizData[i];
        var quizKey = quizRow[findQuizKeyColumnName(quizHeader)];

        var mergedRow = [...quizRow.slice(0, nameIndex + 1)];

        // Add email from roster if available
        if (rosterData) {
            var rosterMatch = findMatchingRow(rosterData, quizKey, findRosterKeyColumnName(rosterData[0]));
            var email = rosterMatch ? rosterMatch[rosterData[0].indexOf('Email')] : '';
            mergedRow.push(email);
        }

        // Add SIS Login ID from gradebook if available
        if (gradebookData) {
            var gradebookMatch = findMatchingRow(gradebookData, quizKey, findGradebookKeyColumnName(gradebookData[0]));
            var studentID = gradebookMatch ? gradebookMatch[gradebookData[0].indexOf('SIS Login ID')] : '';
            mergedRow.push(studentID);
        }

        mergedRow.push(...quizRow.slice(nameIndex + 1));
        mergedData.push(mergedRow);
    }

    return mergedData;
}

// Helper function to find a matching row based on a key
function findMatchingRow(data, key, keyColumnIndex) {
    for (var i = 1; i < data.length; i++) {
        if (data[i][keyColumnIndex] === key) {
            return data[i];
        }
    }
    return null;
}

// Function to trigger the CSV download
function downloadMergedCSV(mergedData) {
    // Remove empty columns
    mergedData = removeEmptyColumns(mergedData);

    // Convert merged data to CSV
    var csvData = Papa.unparse(mergedData);

    // Trigger download of the merged CSV
    var blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "merged.csv";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Helper function to find the key in the quiz file
function findQuizKeyColumnName(row) {
    // Look for 'sis_id' in the quiz file
    return row.indexOf('sis_id');
}

// Helper function to find the key in the roster file
function findRosterKeyColumnName(row) {
    return row.indexOf('Student SIS ID');
}

// Helper function to find the key in the gradebook file
function findGradebookKeyColumnName(row) {
    return row.indexOf('SIS User ID');
}

// Function to remove empty columns
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

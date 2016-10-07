'use strict';

describe('Data Import Dialog - Select Data Source (WAOLG-72)', function () {

    it('should check for the mydata tab name and check for import button', function () {
        browser.waitForAngular();
        expect(fileImport.myDataLink().isPresent()).toBe(true);
        fileImport.myDataLink().click().then(function () {
            browser.waitForAngular();
            expect(fileImport.importButton().isPresent()).toBe(true);
        });
    });

    it('should check if the import modal is opened on click of import button and it contains all the fields', function () {
        browser.waitForAngular();
        fileImport.importButton().click().then(function () {
            expect(fileImport.uploadModal().isPresent()).toBe(true);
            expect(fileImport.modalHeader().getText()).toBe('Import Data');
            expect(fileImport.datasource().isPresent()).toBe(true);
            expect(fileImport.datasourceOption1().getText()).toBe('File');
            expect(fileImport.datasourceOption2().getText()).toBe('Oracle');
            expect(fileImport.datasourceOption3().getText()).toBe('Teradata');
            expect(fileImport.cancel().isPresent()).toBe(true);
            expect(fileImport.datasourceImport().isPresent()).toBe(true);
        });
    });

    it('should return to mydata page when modal cancel is clicked', function () {
        fileImport.cancel().click().then(function () {
            expect(fileImport.uploadModal().isPresent()).toBe(false);
        });
    });
});


describe('Show File Import Data Dialog with all the fields (WAOLG-6) and (WAOLG-73)', function() {

    var count = '', dataname = '';

    it('should check for the mydata tab name and check for import button', function () {
        expect(fileImport.myDataLink().isPresent()).toBe(true);
        fileImport.myDataLink().click().then(function () {
            browser.waitForAngular();
            expect(fileImport.importButton().isPresent()).toBe(true);
        });
    });

    it('should check if the import modal is opened on click of import button and it contains all the fields', function () {
        browser.waitForAngular();
        fileImport.importButton().click().then(function () {
            expect(fileImport.uploadModal().isPresent()).toBe(true);
            expect(fileImport.modalHeader().getText()).toBe('Import Data');
            fileImport.datasource().click().then(function () {
                fileImport.datasourceOption1().click().then(function () {
                    expect(fileImport.dataname().isPresent()).toBe(true);
                    expect(fileImport.description().isPresent()).toBe(true);
                    expect(fileImport.tablename().isPresent()).toBe(true);
                    expect(fileImport.browse().isPresent()).toBe(true);
                    expect(fileImport.cancel().isPresent()).toBe(true);
                    expect(fileImport.importFile().isPresent()).toBe(true);
                });
            });
        });
    });

    it('should return to mydata page when modal cancel is clicked', function () {
        fileImport.cancel().click().then(function () {
             expect(fileImport.uploadModal().isPresent()).toBe(false);
             count = fileImport.recordCount().getText().then(function (text) {
                    return text;
             });
         });
    });

    it('should show error message when dataset name is not entered and import is clicked', function () {
        fileImport.importButton().click().then(function () {
            fileImport.datasource().click().then(function () {
                fileImport.datasourceOption1().click().then(function () {
                    fileImport.importFile().click().then(function () {
                        expect(fileImport.missingDataName().getText()).toBe('Data Set Name is required');
                    });
                });
            });
        });
    });

    it('should show error message when table name is not entered and import is clicked', function () {
        fileImport.dataname().sendKeys('protractortest' + fileImport.getRandomNumber(3));
        dataname = fileImport.dataname().getAttribute('value').then(function (text) {
            return text;
        });
        fileImport.importFile().click().then(function () {
            expect(fileImport.missingTableName().getText()).toBe('Table Name is required');
        });
    });

    it('should show error message when file is not selected and import is clicked', function () {
        fileImport.tablename().sendKeys('emp' + fileImport.getRandomNumber(3));
        fileImport.importFile().click().then(function () {
            expect(fileImport.missingFile().getText()).toBe('Import File is required');
        });
    });

    it('should show error message when file uploaded is not xls', function () {
        fileImport.uploadInput().sendKeys(process.cwd() + 'assets/images/favicon.png');
        expect(fileImport.fileTypeError().getText()).toBe('- This file type not yet supported');

    });

    it('should allow to upload an excel file even when description is not entered', function () {
        fileImport.uploadInput().sendKeys(process.cwd() + '/test/testdata/testfile_new.xlsx');
        fileImport.importFile().click().then(function () {
            browser.waitForAngular();
            expect(fileImport.uploadModal().isPresent()).toBe(false);
            expect(fileImport.recordCount().getText()).toBeGreaterThan(count);
            fileImport.searchButton().sendKeys(dataname);
            expect(fileImport.firstRowData().getText()).toBe(dataname);
        });
    });
});

describe('Show Page - My Data (WAOLG-11)', function() {

    it('should display the uploaded excel in the datagrid and datagrid contains the specified headers', function () {
        browser.waitForAngular();
        expect(fileImport.listData().isDisplayed()).toBe(true);
        var headers = fileImport.tableHeader().map(function (elem, index) {
            return elem.getText();
        });
        headers.then(function(arr) {
            expect(arr[0]).toBe('Data Set Name');
            expect(arr[1]).toBe('Upload Date');
            expect(arr[2]).toBe('Records');
            expect(arr[3]).toBe('Description');
            expect(arr[4]).toBe('Source');
            expect(arr[5]).toBe('Status');
            expect(arr[6]).toBe('Action');
        });
    });

    it('should display the data in the datagrid', function () {
        var tableData = fileImport.tableData().map(function (elem, index) {
            return elem.getText();
        });
        tableData.then(function (arr) {
            for(var i=0; i< 5; i++) {
                if(i !== 3) {
                    expect(arr[i]).not.toBe('');
                }
            }
        });
    });
});

describe('Show Import Status - (WAOLG-8)', function () {

    it('should display the status icon for \'Processing\' and show the tooltip', function () {
        expect(fileImport.firstRowStatusData().getAttribute('class')).toContain('icon-time');
        browser.actions().mouseMove(fileImport.firstRowStatusData()).perform();
        expect(fileImport.statusTooltip().getText()).toContain('The data is syncing to the data lake. It will become available once complete');
    });
});

describe('Show Connection String - (WAOLG-55)', function () {

    it('should show the connection string option on clicking the dropdown', function () {
        fileImport.dropdownBtn().click().then(function () {
            expect(fileImport.connectionText().getText()).toBe('Show Connection String');
        });
    });

    it('should the connection string modal on clicking \'Show Connection String\'', function () {
        fileImport.connectionStr().click().then(function () {
            browser.waitForAngular();
            expect(fileImport.modalHeader().getText()).toBe('Connection String');
            expect(fileImport.strValue().getText()).not.toBe('');
        });
    });

    it('should close the modal on clicking the close icon', function () {
        fileImport.close().click().then(function () {
            expect(fileImport.listData().isDisplayed()).toBe(true);
        });
    });
});


describe('Rename Data Set - (WAOLG-82)', function () {

    var oldname = '', updatedname ='';

    it('should show the rename string option on clicking the dropdown', function () {
        fileImport.dropdownBtn().click().then(function () {
            expect(fileImport.renameText().getText()).toBe('Rename');
        });
    });

    it('should the rename modal on clicking \'Rename\'', function () {
        fileImport.renameStr().click().then(function () {
            browser.waitForAngular();
            expect(fileImport.modalHeader().getText()).toBe('Rename Data Set');
            expect(fileImport.close().isPresent()).toBe(true);
            expect(fileImport.updateName().isPresent()).toBe(true);
            expect(fileImport.updatedDataName().isPresent()).toBe(true);
        });
    });

    it('should error message when \'Save\' is clicked when no name is entered', function () {
        fileImport.updateName().click().then(function () {
            expect(fileImport.missingNewName().getText()).toBe('New Name is required');
        });
    });

    it('should close the modal on clicking the close icon', function () {
        fileImport.close().click().then(function () {
            expect(fileImport.listData().isDisplayed()).toBe(true);
            oldname = fileImport.searchButton().getAttribute('value').then(function (text) {
                return text;
            });
        });
    });

    it('should rename the data set on clicking the save button after the new name is entered', function () {
        fileImport.dropdownBtn().click().then(function () {
            fileImport.renameStr().click().then(function () {
                fileImport.updatedDataName().sendKeys('updatedProtractor' + fileImport.getRandomNumber(3));
                updatedname = fileImport.updatedDataName().getAttribute('value').then(function (text) {
                    return text;
                });
                fileImport.updateName().click().then(function () {
                    fileImport.searchButton().clear();
                    fileImport.searchButton().sendKeys(oldname);
                    expect(fileImport.recordCount().getText()).toBe('0');
                    fileImport.searchButton().clear();
                    fileImport.searchButton().sendKeys(updatedname);
                    expect(fileImport.firstRowData().getText()).toBe(updatedname);
                });
            });
        });
    });

});

describe('Show Delete Data - (WAOLG-7) and (WAOLG-83)', function() {

    it('should show the delete option on clicking the dropdown', function () {
        fileImport.dropdownBtn().click().then(function () {
            expect(fileImport.deleteText().getText()).toBe('Delete');
        });
    });

    it('should show the delete modal on clicking \'Delete\'', function () {
        fileImport.deleteStr().click().then(function () {
            browser.waitForAngular();
            expect(fileImport.modalHeader().getText()).toBe('Delete Data Set');
            expect(fileImport.close().isPresent()).toBe(true);
            expect(fileImport.deleteData().isPresent()).toBe(true);
            expect(fileImport.strValue().getText()).toBe('Are you sure that you wish to delete? This action cannot be undone.');
        });
    });

    it('should close the modal on clicking the close icon', function () {
        fileImport.close().click().then(function () {
            expect(fileImport.listData().isDisplayed()).toBe(true);
        });
    });

    it('should delete the data in datagrid on click of Delete', function () {
        var dataName = fileImport.searchButton().getAttribute('value');
        fileImport.dropdownBtn().click().then(function () {
            fileImport.deleteStr().click().then(function () {
                fileImport.deleteData().click().then(function () {
                    expect(fileImport.listData().isDisplayed()).toBe(true);
                    fileImport.searchButton().clear();
                    fileImport.searchButton().sendKeys(dataName);
                    expect(fileImport.recordCount().getText()).toBe('0');
                });
            });
        });
    });
});
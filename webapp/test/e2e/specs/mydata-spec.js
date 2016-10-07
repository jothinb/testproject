'use strict';

describe('Data Import Dialog - Select Data Source (WAOLG-72)', function () {

    it('should check for the mydata tab name and check for import button', function () {
        expect(mydataPage.myDataLink().isPresent()).toBe(true);
        mydataPage.myDataLink().click().then(function () {
            browser.waitForAngular();
            expect(mydataPage.importButton().isPresent()).toBe(true);
        });
    });

    it('should check if the import modal is opened on click of import button and it contains all the fields', function () {
        browser.waitForAngular();
        mydataPage.importButton().click().then(function () {
            expect(mydataPage.uploadModal().isPresent()).toBe(true);
            expect(mydataPage.modalHeader().getText()).toBe('Import Data');
            expect(mydataPage.datasource().isPresent()).toBe(true);
            expect(mydataPage.datasourceOption1().getText()).toBe('File');
            expect(mydataPage.datasourceOption2().getText()).toBe('Database');
            expect(mydataPage.cancel().isPresent()).toBe(true);
            expect(mydataPage.datasourceImport().isPresent()).toBe(true);
        });
    });

    it('should return to mydata page when modal cancel is clicked', function () {
        mydataPage.cancel().click().then(function () {
            expect(mydataPage.uploadModal().isPresent()).toBe(false);
        });
    });
});


xdescribe('Show Import Data Dialog (WAOLG-6)', function() {

    var count = '', dataname = '';

    it('should check for the mydata tab name and check for import button', function () {
        expect(mydataPage.myDataLink().isPresent()).toBe(true);
        mydataPage.myDataLink().click().then(function () {
            browser.waitForAngular();
            expect(mydataPage.importButton().isPresent()).toBe(true);
        });
    });

    it('should check if the import modal is opened on click of import button and it contains all the fields', function () {
        browser.waitForAngular();
        mydataPage.importButton().click().then(function () {
            expect(mydataPage.uploadModal().isPresent()).toBe(true);
            expect(mydataPage.modalHeader().getText()).toBe('Import Data');
            expect(mydataPage.dataname().isPresent()).toBe(true);
            expect(mydataPage.browse().isPresent()).toBe(true);
            expect(mydataPage.cancel().isPresent()).toBe(true);
            expect(mydataPage.importFile().isPresent()).toBe(true);
        });
    });

    it('should return to mydata page when modal cancel is clicked', function () {
        mydataPage.cancel().click().then(function () {
             expect(mydataPage.uploadModal().isPresent()).toBe(false);
             count = mydataPage.recordCount().getText().then(function (text) {
                    return text;
             });
         });
    });

    it('should show error message when dataset name is not entered and import is clicked', function () {
        mydataPage.importButton().click().then(function () {
            mydataPage.importFile().click().then(function () {
                //expect(mydataPage.missingDataName().isDisplayed()).toBeTruthy();
                expect(mydataPage.missingDataName().getText()).toBe('Dataset Name value is required');
            });
        });
    });

    it('should show error message when file is not selected and import is clicked', function () {
        mydataPage.dataname().sendKeys('test' + mydataPage.getRandomNumber(3));
        dataname = mydataPage.dataname().getAttribute('value').then(function (text) {
            return text;
        });
        mydataPage.importFile().click().then(function () {
            expect(mydataPage.missingFile().isDisplayed()).toBeTruthy();
            expect(mydataPage.missingFile().getText()).toBe('Import File is required');
        });
    });

    it('should show error message when file uploaded is not xls', function () {
        mydataPage.uploadInput().sendKeys(process.cwd() + 'assets/images/favicon.png');
        expect(mydataPage.fileTypeError().getText()).toBe('Import File must be .xls');

    });

    it('should allow to upload an excel file even when description is not entered', function () {
        mydataPage.uploadInput().sendKeys(process.cwd() + '/test/testdata/testfile_new.xlsx');
        mydataPage.importFile().click().then(function () {
            browser.waitForAngular();
            expect(mydataPage.uploadModal().isPresent()).toBe(false);
            expect(mydataPage.recordCount().getText()).toBeGreaterThan(count);
            mydataPage.searchButton().sendKeys(dataname);
            expect(mydataPage.firstRowData().getText()).toBe(dataname);
            mydataPage.searchButton().clear();
        });
    });
});

xdescribe('Show Page - My Data (WAOLG-11)', function() {

    it('should display the uploaded excel in the datagrid and datagrid contains the specified headers', function () {
        browser.waitForAngular();
        expect(mydataPage.listData().isDisplayed()).toBe(true);
        var headers = mydataPage.tableHeader().map(function (elem, index) {
            return elem.getText();
        });
        headers.then(function(arr) {
            expect(arr[0]).toBe('Data Set Name');
            expect(arr[1]).toBe('Upload Date');
            expect(arr[2]).toBe('Records');
            expect(arr[3]).toBe('Description');
            expect(arr[4]).toBe('Source File');
            expect(arr[5]).toBe('Status');
            expect(arr[6]).toBe('Delete');
        });
    });

    it('should display the data in the datagrid', function () {
        var tableData = mydataPage.tableData().map(function (elem, index) {
            return elem.getText();
        });
        tableData.then(function (arr) {
            for(var i=0; i < arr.length; i++) {
                expect(arr[i]).not.toBeNull();
            }
        });
    });

});

xdescribe('Display Delete Column on Data Sets Table (WAOLG-7)', function() {

    it('should show the confirmation dialog on click of delete button and return to the my data page on click of Cancel', function () {
        mydataPage.deleteIcon().click().then(function () {
            expect(mydataPage.modalHeader().getText()).toBe('Confirmation');
            expect(mydataPage.deleteCancel().isPresent()).toBe(true);
            expect(mydataPage.deleteData().isPresent()).toBe(true);
            mydataPage.deleteCancel().click().then(function () {
                expect(mydataPage.listData().isDisplayed()).toBe(true);
            });
        });
    });

    it('should delete the data in datagrid on click of Delete', function () {
        var dataName = mydataPage.firstRowData().getText().then(function (text) {
            return text;
        });
        mydataPage.deleteIcon().click().then(function () {
            mydataPage.deleteData().click().then(function () {
                expect(mydataPage.listData().isDisplayed()).toBe(true);
                mydataPage.searchButton().sendKeys(dataName);
                expect(mydataPage.recordCount().getText()).toBe('0');
            });
        });
    });
});
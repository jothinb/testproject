'use strict';


describe('Show Database Import Dialog with all the fields (WAOLG-77)', function() {

    var count = '', dataname = '';

    it('should check for the mydata tab name and check for import button', function () {
        expect(databaseImport.myDataLink().isPresent()).toBe(true);
        databaseImport.myDataLink().click().then(function () {
            browser.waitForAngular();
            expect(databaseImport.importButton().isPresent()).toBe(true);
        });
    });

    it('should check if the import modal is opened on click of import button and it contains all the fields for datasource \'Oracle\'', function () {
        browser.waitForAngular();
        databaseImport.importButton().click().then(function () {
            expect(databaseImport.uploadModal().isPresent()).toBe(true);
            expect(databaseImport.modalHeader().getText()).toBe('Import Data');
            databaseImport.datasource().click().then(function () {
                databaseImport.datasourceOption2().click().then(function () {
                    expect(databaseImport.connectionURL().isPresent()).toBe(true);
                    expect(databaseImport.connectionUsername().isPresent()).toBe(true);
                    expect(databaseImport.connectionPassword().isPresent()).toBe(true);
                    expect(databaseImport.cancel().isPresent()).toBe(true);
                    expect(databaseImport.dbConnect().isPresent()).toBe(true);
                    expect(databaseImport.connectionURL().getAttribute('placeholder')).toBe('jdbc:oracle:thin:@//[HOST][:PORT]/SERVICE');
                });
            });
        });
    });

    it('should check if the import modal contains all the fields for datasource \'Teradata\'', function () {
        databaseImport.datasource().click().then(function () {
            databaseImport.datasourceOption3().click().then(function () {
                expect(databaseImport.connectionURL().isPresent()).toBe(true);
                expect(databaseImport.connectionUsername().isPresent()).toBe(true);
                expect(databaseImport.connectionPassword().isPresent()).toBe(true);
                expect(databaseImport.cancel().isPresent()).toBe(true);
                expect(databaseImport.dbConnect().isPresent()).toBe(true);
                expect(databaseImport.connectionURL().getAttribute('placeholder')).toBe('jdbc:teradata://MyDatabaseServer/database=MyDatabaseName');
            });
        });
    });

    it('should return to mydata page when modal cancel is clicked', function () {
        databaseImport.cancel().click().then(function () {
             expect(databaseImport.uploadModal().isPresent()).toBe(false);
             count = databaseImport.recordCount().getText().then(function (text) {
                    return text;
             });
         });
    });

    it('should show error message when connection url is not entered and connect is clicked', function () {
        databaseImport.importButton().click().then(function () {
            databaseImport.datasource().click().then(function () {
                databaseImport.datasourceOption2().click().then(function () {
                    databaseImport.dbConnect().click().then(function () {
                        expect(databaseImport.missingURL().getText()).toBe('Connection URL is required');
                    });
                });
            });
        });
    });

    it('should show error message when user name is not entered and connect is clicked', function () {
        databaseImport.connectionURL().sendKeys('jdbc:oracle:thin:@sjc1database01.crd.ge.com:1523:sjcgrdv3');
        databaseImport.dbConnect().click().then(function () {
            expect(databaseImport.missingUsername().getText()).toBe('Username is required');
        });
    });

    it('should show error message when password is not entered and connect is clicked', function () {
        databaseImport.connectionUsername().sendKeys('esv_usr_web');
        databaseImport.dbConnect().click().then(function () {
            expect(databaseImport.missingPassword().getText()).toBe('Password is required');
        });
    });

    it('should be possible to Connect when all the fields are entered', function () {
        databaseImport.connectionPassword().sendKeys('xYz2013');
    });
});

describe('Show all the Database schemas, tables, and views (WAOLG-80)', function () {

    var dataname = '';

    it('should be possible to list all the schemas with the tables and views', function () {
        databaseImport.dbConnect().click().then(function () {
            databaseImport.tableviewList().click().then(function () {
                databaseImport.connectionDataName().sendKeys('protractor' + fileImport.getRandomNumber(3));
                dataname = databaseImport.connectionDataName().getAttribute('value').then(function (text) {
                    return text;
                });
                databaseImport.uploadDB().click().then(function () {
                    expect(databaseImport.uploadModal().isPresent()).toBe(false);
                    databaseImport.searchButton().sendKeys(dataname);
                    expect(databaseImport.firstRowData().getText()).toBe(dataname);
                })
            });
        });
    });
});

describe('Show Page - My Data (WAOLG-11)', function() {

    it('should display the uploaded data from database in the datagrid and datagrid contains the specified headers', function () {
        browser.waitForAngular();
        expect(databaseImport.listData().isDisplayed()).toBe(true);
        var headers = databaseImport.tableHeader().map(function (elem, index) {
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
        var tableData = databaseImport.tableData().map(function (elem, index) {
            return elem.getText();
        });
        tableData.then(function (arr) {
            for(var i=0; i < 5; i++) {
                if(i !== 3) {
                    expect(arr[i]).not.toBe('');
                }
            }
        });
    });
});

describe('Show Import Status - (WAOLG-8)', function () {

    it('should display the status icon for \'Processing\' and show the tooltip', function () {
        expect(databaseImport.firstRowStatusData().getAttribute('class')).toContain('icon-time');
        browser.actions().mouseMove(databaseImport.firstRowStatusData()).perform();
        expect(databaseImport.statusTooltip().getText()).toContain('The data is syncing to the data lake. It will become available once complete');
    });
});

describe('Show Connection String - (WAOLG-55)', function () {

    it('should show the connection string option on clicking the dropdown', function () {
        databaseImport.dropdownBtn().click().then(function () {
            expect(databaseImport.connectionText().getText()).toBe('Show Connection String');
        });
    });

    it('should the connection string modal on clicking \'Show Connection String\'', function () {
        databaseImport.connectionStr().click().then(function () {
            browser.waitForAngular();
            expect(databaseImport.modalHeader().getText()).toBe('Connection String');
            expect(databaseImport.strValue().getText()).not.toBe('');
        });
    });

    it('should close the modal on clicking the close icon', function () {
        databaseImport.close().click().then(function () {
            expect(databaseImport.listData().isDisplayed()).toBe(true);
        });
    });
});


describe('Rename Data Set - (WAOLG-82)', function () {

    var oldname = '', updatedname ='';

    it('should show the rename string option on clicking the dropdown', function () {
        databaseImport.dropdownBtn().click().then(function () {
            expect(databaseImport.renameText().getText()).toBe('Rename');
        });
    });

    it('should the rename modal on clicking \'Rename\'', function () {
        databaseImport.renameStr().click().then(function () {
            browser.waitForAngular();
            expect(databaseImport.modalHeader().getText()).toBe('Rename Data Set');
            expect(databaseImport.close().isPresent()).toBe(true);
            expect(databaseImport.updateName().isPresent()).toBe(true);
            expect(databaseImport.updatedDataName().isPresent()).toBe(true);
        });
    });

    it('should error message when \'Save\' is clicked when no name is entered', function () {
        databaseImport.updateName().click().then(function () {
            expect(databaseImport.missingNewName().getText()).toBe('New Name is required');
        });
    });

    it('should close the modal on clicking the close icon', function () {
        databaseImport.close().click().then(function () {
            expect(databaseImport.listData().isDisplayed()).toBe(true);
            oldname = databaseImport.searchButton().getAttribute('value').then(function (text) {
                return text;
            });
        });
    });

    it('should rename the data set on clicking the save button after the new name is entered', function () {
        databaseImport.dropdownBtn().click().then(function () {
            databaseImport.renameStr().click().then(function () {
                databaseImport.updatedDataName().sendKeys('updatedProtractor' + fileImport.getRandomNumber(3));
                updatedname = databaseImport.updatedDataName().getAttribute('value').then(function (text) {
                    return text;
                });
                databaseImport.updateName().click().then(function () {
                    databaseImport.searchButton().clear();
                    databaseImport.searchButton().sendKeys(oldname);
                    expect(databaseImport.recordCount().getText()).toBe('0');
                    databaseImport.searchButton().clear();
                    databaseImport.searchButton().sendKeys(updatedname);
                    expect(databaseImport.firstRowData().getText()).toBe(updatedname);
                });
            });
        });
    });

});

describe('Show Delete Data - (WAOLG-7) and (WAOLG-83)', function() {

    it('should show the delete option on clicking the dropdown', function () {
        databaseImport.dropdownBtn().click().then(function () {
            expect(databaseImport.deleteText().getText()).toBe('Delete');
        });
    });

    it('should show the delete modal on clicking \'Delete\'', function () {
        databaseImport.deleteStr().click().then(function () {
            browser.waitForAngular();
            expect(databaseImport.modalHeader().getText()).toBe('Delete Data Set');
            expect(databaseImport.close().isPresent()).toBe(true);
            expect(databaseImport.deleteData().isPresent()).toBe(true);
            expect(databaseImport.strValue().getText()).toBe('Are you sure that you wish to delete? This action cannot be undone.');
        });
    });

    it('should close the modal on clicking the close icon', function () {
        databaseImport.close().click().then(function () {
            expect(databaseImport.listData().isDisplayed()).toBe(true);
        });
    });

    it('should delete the data in datagrid on click of Delete', function () {
        var dataName = databaseImport.searchButton().getAttribute('value');
        databaseImport.dropdownBtn().click().then(function () {
            databaseImport.deleteStr().click().then(function () {
                databaseImport.deleteData().click().then(function () {
                    expect(databaseImport.listData().isDisplayed()).toBe(true);
                    databaseImport.searchButton().clear();
                    databaseImport.searchButton().sendKeys(dataName);
                    expect(databaseImport.recordCount().getText()).toBe('0');
                });
            });
        });
    });
});
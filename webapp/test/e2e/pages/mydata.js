var mydataPage = function() {

    this.myDataLink = function () { return element(by.css('.container > ul > li:nth-child(2) > a'));};
    this.importButton = function () { return element(by.css('[ng-click="openUploadModal()"]'));};
    this.advancedSearch = function () { return element(by.css('.advancedSearch-container > button'));};
    this.uploadModal = function () { return element(by.id('upload'));};
    this.modalHeader = function() { return element(by.css('.modal-header > h3'));};
    this.dataname = function () { return element(by.model('dataset.name'));};
    this.description = function () { return element(by.model('dataset.description'));};
    this.browse = function () { return element(by.css('[ng-click="initiateBrowse()"]'));};
    this.cancel = function () { return element(by.css('[ng-click="clearField()"]'));};
    this.importFile = function () { return element(by.css('[ng-click="importFiles()"]'));};
    this.missingDataName = function () { return element(by.css('[ng-if="missingName"]'));};
    this.missingFile = function () { return element(by.css('[ng-if="missingFile"]'));};
    this.fileTypeError = function () { return element(by.css('[ng-if="errorFileType"]'));};
    this.uploadInput = function () { return element(by.id('uploadInput'));};
    this.getRandomNumber = function (numberLength) {
        var randomNumber = "";
        var possible = "0123456789";
        for (var i = 0; i < numberLength; i++)
            randomNumber += possible.charAt(Math.floor(Math.random() * possible.length));
        return randomNumber;
    };
    this.recordCount = function () { return element(by.css('.dataTables_info > strong:nth-child(3)'));};
    this.listData = function () { return element(by.css('[data-table-name="listData"]'));};
    this.tableHeader = function () { return element.all(by.css('table > thead > tr > th'));};
    this.tableData = function () { return element.all(by.css('table > tbody > tr > td'));};
    this.deleteIcon = function () { return element(by.css('table > tbody > tr:nth-child(1) > td:nth-child(7) > a > i'));};
    this.deleteCancel = function () {return element(by.css('[ng-click="cancel()"]'));};
    this.deleteData = function () {return element(by.css('[ng-click="confirmDelete()"]'));};
    this.firstRowData = function () { return element(by.css('table > tbody > tr:nth-child(1) > td:nth-child(1)'));};
    this.allRows = function () { return element.all(by.css('table > tbody > tr > td'));};
    this.searchButton = function () { return element(by.css('.input-append > .search-query'));};
    this.datasource = function () { return element(by.model('datasource'));};
    this.datasourceImport = function () { return element(by.css('.modal-footer > div > button'));};
    this.datasourceOption1 = function () { return element(by.cssContainingText('option', 'File'));};
    this.datasourceOption2 = function () { return element(by.cssContainingText('option', 'Database'));};
};
module.exports = new mydataPage();
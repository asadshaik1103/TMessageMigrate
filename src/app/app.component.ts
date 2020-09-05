import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fileToUpload: File = null;
  csvData = null;
  datalogs = [];
  constructor(private fb: FormBuilder, private appService: AppService){}
  title = 'message-relay';
  msgRelayForm = this.fb.group({
    serverUrl: ['', Validators.required],
    sourceToken: ['', Validators.required],
    targetToken: ['', Validators.required],
    waitTime: ['', Validators.required],
    csvFile: ['', Validators.required],
  });

  // tslint:disable-next-line: typedef
  onSubmit() {
      // TODO: Use EventEmitter with form value
      const appComponent = this;
      this.appService.migrateMessages(this.msgRelayForm.value.serverUrl,
        this.msgRelayForm.value.sourceToken,
        this.msgRelayForm.value.targetToken,
        this.msgRelayForm.value.waitTime,
        this.csvData,
        ).then(function success(response){
          appComponent.datalogs = response.datalogs;
        });
    }
  handleFileInput(files: FileList) {
      this.fileToUpload = files.item(0);
      if (files && files.length > 0) {
        const file: File = files.item(0);
        const fileReader: FileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onload = ev => {
          const csvdata = fileReader.result.toString();
          this.csvData = csvdata.split('\n');
        };
      }
    }
  // csvToArray = (csvString) => {
  //   const lines = csvString.split('\n');
  //   const headerValues = lines[0].split(',');
  //   const dataValues = lines.splice(1).map(function (dataLine) { return dataLine.split(','); });
  //   return dataValues.map(function(rowValues) {
  //       var row = {};
  //       headerValues.forEach(function (headerValue, index) {
  //           row[headerValue] = (index < rowValues.length) ? rowValues[index] : null;
  //       });
  //       return row;
  //   });
  // }
}

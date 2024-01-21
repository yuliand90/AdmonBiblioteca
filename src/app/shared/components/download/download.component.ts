import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as printJS from 'print-js';
import { MetaDataColumn } from '../../interfaces/metacolumn.interfaces';

@Component({
  selector: 'agb-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
})
export class DownloadComponent implements OnInit {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { data: any[]; metaDataColumn: MetaDataColumn[] }
  ) {}

  ngOnInit(): void {}

  export(type: string): void {
    let field: string[] = [];
    let head: string[] = [];
    let body: any[] = [];
    let item: any[] = [];
    this.data.metaDataColumn.forEach((element) => {
      field.push(element.field);
      head.push(element.title);
    });

    this.data.data.forEach((value) => {
      field.forEach((key) => {
        item.push(value[key]);
      });
      body.push(item);
      item = [];
    });

    console.log(head);
    if (type === 'pdf') {
      const doc = new jsPDF();
      autoTable(doc, {
        head: [head],
        body: body,
      });
      doc.save('Awb_Report.pdf');
    } else if (type === 'print') {
      const doc = new jsPDF();
      autoTable(doc, {
        head: [head],
        body: body,
      });
      const data = doc.output('blob');
      const blobUrl = URL.createObjectURL(data);
      printJS(blobUrl);
    } else if (type === 'view') {
      const doc = new jsPDF();
      autoTable(doc, {
        head: [head],
        body: body,
      });
      doc.output('dataurlnewwindow');
    }
  }

  setColumns(): any[] {
    let columns: any[] = [];
    let headers: MetaDataColumn[] = this.data.metaDataColumn;
    headers.forEach((e) => {
      columns.push({
        header: e.title,
        key: e.field,
      });
    });

    console.log(columns);
    return columns;
  }
}

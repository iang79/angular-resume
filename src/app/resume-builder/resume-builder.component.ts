import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



@Component({
  selector: 'app-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.css']
})
export class ResumeBuilderComponent implements OnInit {
   @ViewChild('htmlData') htmlData:ElementRef;

  resumeBuilderForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.resumeBuilderForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: '',
      experienceBlocks: this.formBuilder.array([this.buildExperienceBlock()]),
      educationBlocks: this.formBuilder.array([this.buildEducationBlock()])
    });
  }

  buildExperienceBlock(): FormGroup {
    return this.formBuilder.group({
      title: ['', [Validators.required]],
      company: ['', [Validators.required]],
      location: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  buildEducationBlock(): FormGroup {
    return this.formBuilder.group({
      title: ['', [Validators.required]],
      company: ['', [Validators.required]],
      location: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
  save() {
    console.log(this.resumeBuilderForm);
    console.log('Saved: ' + JSON.stringify(this.resumeBuilderForm.value));
  }

  get experienceBlocks(): FormArray {
    
    return this.resumeBuilderForm.get('experienceBlocks') as FormArray;
  }

  get educationBlocks(): FormArray {
    return this.resumeBuilderForm.get('educationBlocks') as FormArray;
  }

  addExperience() {
    this.experienceBlocks.insert(0, this.buildExperienceBlock());
  }

  addEducation() {
    this.educationBlocks.insert(0, this.buildEducationBlock());
  }

  public openPDF():void {
    const doc = new jsPDF();

    //doc.text(JSON.stringify(this.resumeBuilderForm.value, null, "\t"),10,10);

    doc.text(
      "Nombre : "+this.resumeBuilderForm.value.firstName+"\n"+
      "Apellidos : "+this.resumeBuilderForm.value.lastName+"\n"+ 
      "email : "+this.resumeBuilderForm.value.email+"\n"+ 
      "Teléfono : "+this.resumeBuilderForm.value.lastName+"\n"+ 
      
      "EXPERIENCIA \n"+
      "Cargo : " +this.resumeBuilderForm.value.experienceBlocks['title']+"\n"+ 
      "Empresa : " +this.resumeBuilderForm.value.experienceBlocks['company']+"\n"+ 
      "Localización : " +this.resumeBuilderForm.value.experienceBlocks['location']+"\n"+ 
      "Fecha de inicio : " +this.resumeBuilderForm.value.experienceBlocks['startDate']+"\n"+ 
      "Fecha final : " +this.resumeBuilderForm.value.experienceBlocks['endDate']+"\n"+ 
      "Descripción : " +this.resumeBuilderForm.value.experienceBlocks['description']+"\n" +
      
      "EDUCACION \n"+
      "Cargo : " +this.resumeBuilderForm.value.educationBlocks['title']+"\n"+ 
      "Empresa : " +this.resumeBuilderForm.value.educationBlocks['company']+"\n"+ 
      "Localización : " +this.resumeBuilderForm.value.educationBlocks['location']+"\n"+ 
      "Fecha de inicio : " +this.resumeBuilderForm.value.educationBlocks['startDate']+"\n"+ 
      "Fecha final : " +this.resumeBuilderForm.value.educationBlocks['endDate']+"\n"+ 
      "Descripción : " +this.resumeBuilderForm.value.educationBlocks['description']+"\n"
      
      
         ,10,10)
    doc.save('demo.pdf');
    
  }
}

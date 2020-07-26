import React from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';


export default class FileUpload extends React.Component{

    state={
        path:''
    }

    AddPDF = (error, file)=>{
        console.log(file)
        if(this.fileValidate(file)){
            //אם הקובץ שעלה עומד בתנאים עכשיו ניתן להעלות אותו לסרבר
            //save to DB
            this.saveToDB(file);
        }
    }
    fileValidate = (file)=>{
        console.log(file.fileExtension)
        let isValid = true;
        //file.fileExtension זה בעצם הסיומת של הקובץ אם אתם רוצים להגביל את המשתמש לסוג קובץ מסוים תוסיפו תנאי
        //  if (file.fileExtension !=='pdf' || file.fileExtension !=='jpg' || file.fileExtension !=='png') {
        //      isValid = false;
        //  }
        if(isValid){
            console.log(file.fileExtension);
            console.log(file.fileSize);
        }
        return isValid;
    }
    saveToDB=(file)=>{
        console.log("the uploaded file",file.file.name);
        this.setState({
            path:'http://proj.ruppin.ac.il/igroup7/proj/uploadedFiles/'+file.file.name,
        });
        console.log(this.state.path);
        const data= new FormData();
        data.append("UploadedFile",file.file);
        //גישה לקונטרולר
        fetch('https://proj.ruppin.ac.il/igroup7/proj/api/uploadPic', {
            method: 'post',
            contentType: false,
            processData: false,
            mode:'no-cors',
            body: data
        }).then((data)=> {
            console.log(data);
            this.props.onFileUploaded(this.state.path);
        }).catch((error)=>{
            console.log(error);
        });
    }
    render(){
        return(
            <div >
                <FilePond allowMultiple={false} onaddfile={this.AddPDF} labelIdlE='PDF UPLOAD'/>
            </div>
        )
    }
}

import React, { Component, useState, useEffect } from 'react';
import ContentWrapper from './ContentWeapper';
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import Modal from 'react-bootstrap/Modal';
import { makeStyles } from '@material-ui/core/styles';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
//import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';
import '@fullcalendar/bootstrap/main.css';

import Req from './RequestForReplacementView';



class Calendar extends Component {
    calendarPlugins = [
       // interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
        bootstrapPlugin
    ];

    calendarHeader = {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    };

    // External events properties

    evColors = [
        'danger',
        'primary',
        'info',
        'success',
        'warning',
        'green',
        'pink',
        'inverse',
        'purple'
    ];


     handleOpen = () => {
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
      };

    state = {
        selectedEvent: null,
        evRemoveOnDrop: false,
        evSelectedColor: this.evColors[0],
        evNewName: '',
        externalEvents: [
            { color: 'green', name: 'Lunch' },
            { color: 'danger', name: 'Go home' },
            { color: 'info', name: 'Do homework' },
            { color: 'warning', name: 'Work on UI design' },
            { color: 'inverse', name: 'Sleep tight' }
        ],
        requests: '',
        events: [],
        eventCode:0,
        open:false,
    };

    componentDidMount() {

        let branchCode = JSON.parse(localStorage["userDetails"]).BranchCode;
        fetch("http://proj.ruppin.ac.il/igroup7/proj/api/RequestDetails/getBranchRequests/" + branchCode + '/',{
            method:'GET',
            headers:{
                Accept:'application/json','Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((res)=> {console.log(res);
        this.setState({requests: res});
        this.makeEvents(res);
        })
        .catch((error)=>console.log(error))
    }

    makeEvents (res) {

        let events = [];
        let distinctReq = [];
        let reqCodes = [];
        let request = "";

        const arr = [...new Set(res && res.map((x) => {
                  if (!reqCodes.includes(x.ReplacmentCode) && x.RequestStatus === "open") 
                  {
                    request = {
                      ReplacmentCode: x.ReplacmentCode,
                      Logo: x.Logo,
                      TypeName: x.TypeName,
                      ReplacementDate: x.ReplacementDate,
                      FromHour: x.FromHour,
                      ToHour: x.ToHour,
                      IsHistory: x.IsHistory,
                    }
                    reqCodes.push(x.ReplacmentCode)
                    distinctReq.push(request)
                  }
                }))]


        //new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())

            distinctReq&& distinctReq.filter((event)=>(event.IsHistory===false )).map(event =>{
            //console.log(new Date(event.ReplacementDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")))
            let e = {
                title: event.TypeName,
                start: event.ReplacementDate,
                end: event.ReplacementDate,
                backgroundColor: '#00a65a',
                borderColor: '#00a65a',
                code: event.ReplacmentCode,
                textAlign:'center'
            }
            events.push(e);
        });

         res && res.filter((event)=>(event.IsHistory===false && event.IsAprrovedByTrainer === "true" && event.RequestStatus === "approved" )).map((event) =>{
            let e = {
                title: event.TypeName,
                start: event.ReplacementDate,
                end: event.ReplacementDate,
                backgroundColor:'#f56954',
                borderColor: '#f56954',
                code: event.ReplacmentCode
            }
            events.push(e);
        });

         res && res.filter((event)=>(event.IsHistory===true && event.IsAprrovedByTrainer === "true" && event.RequestStatus === "approved" )).map((event) =>{
            let e = {
                title: event.TypeName,
                start: event.ReplacementDate,
                end: event.ReplacementDate,
                backgroundColor: '#f39c12', 
                borderColor: '#f39c12',
                code: event.ReplacmentCode
            }
            events.push(e);


        });
        console.log("events:",events);
        this.setState({events: events});
    }


    addRandomEvent() {
        // add dynamically an event
        this.addEvent({
            title: 'Random Event',
            start: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                Math.random() * (30 - 1) + 1
            ),
            backgroundColor: '#c594c5', //purple
            borderColor: '#c594c5' //purple
        });
    }

    eventClicked = event => {
        console.log("code:",event.event._def.extendedProps.code);
        let code = event.event._def.extendedProps.code
        this.setState({eventCode: code});
        this.handleOpen();

    };

    // add event directly into calendar
    addEvent(event) {
        this.calendarEvents.push(event);
    }

    handleEventReceive = info => {
        var styles = getComputedStyle(info.draggedEl);
        info.event.setProp('backgroundColor', styles.backgroundColor);
        info.event.setProp('borderColor', styles.borderColor);

        // is the "remove after drop" checkbox checked?
        if (this.state.evRemoveOnDrop) {
            this.removeExternalEvent(info.draggedEl.textContent);
        }
    };

    getEvColorClasses(evcolor) {
        return 'bg-' + evcolor + (this.state.evSelectedColor === evcolor ? ' selected' : '');
    }

    addNewExternalEvent = () => {
        const externalEvents = this.state.externalEvents.concat({
            color: this.state.evSelectedColor,
            name: this.state.evNewName
        });
        this.setState({
            externalEvents
        });
    };

    removeExternalEvent = name => {
        let externalEvents = [...this.state.externalEvents];
        const index = externalEvents.findIndex(e => e.name === name);
        if (index > -1) {
            externalEvents.splice(index, 1);
            this.setState({
                externalEvents
            });
        }
    };

    selectColor = color => () => {
        this.setState({
            evSelectedColor: color
        });
    };

    handleCheck = event => {
        this.setState({
            evRemoveOnDrop: event.target.checked
        });
    };

    handleInputName = event => {
        this.setState({
            evNewName: event.target.value
        });
    };

    render() {
     //   const { externalEvents, selectedEvent } = this.state;
        return (
            <ContentWrapper>

        <Modal
          show={this.state.open}
          onHide={this.handleClose}
        >
            <Modal.Body>
            <div dir="rtl" style = {{textAlign:'right'}} >
            <Req req={this.state.requests && this.state.requests.filter(val => val.ReplacmentCode === this.state.eventCode)}/>
            </div>
            </Modal.Body>               
        </Modal>


                <div className="calendar-app" style={{textAlign:'right'}} >
                    <div>
                    <h6 style={{textAlign:'right'}}>
                        <lable style={{backgroundColor:'#00a65a',margin:'5px'}}>החלפה פתוחה</lable>
                        <lable style={{backgroundColor: '#f56954',margin:'5px'}}>החלפה מאושרת</lable>
                        <lable style={{backgroundColor: '#f39c12',margin:'5px'}}>החלפה היסטורית</lable>
                    </h6>
                    </div>
                    
                    <div className="row" >
                            <Card className="card-default">
                                <CardBody style={{backgroundColor:'white'}}>
                                    {/* START calendar */}
                                    <FullCalendar
                                        defaultView={this.dayGridMonth}
                                        plugins={this.calendarPlugins}
                                        events={this.state.events}
                                        themeSystem={"bootstrap"}
                                        header={this.calendarHeader}
                                        editable={true}
                                        droppable={true}
                                        deepChangeDetection={true}
                                        dateClick={this.dayClick}
                                        eventReceive={this.handleEventReceive}
                                        eventClick={this.eventClicked}
                                        >
                                    </FullCalendar>
                                </CardBody>
                            </Card>
                    </div>
                </div>
            </ContentWrapper>
        );
    }
}

export default Calendar;

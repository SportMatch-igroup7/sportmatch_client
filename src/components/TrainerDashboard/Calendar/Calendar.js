import React, { Component, useState, useEffect } from 'react';
import ContentWrapper from './ContentWeapper';
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap';

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

class Calendar extends Component {

    calendarPlugins = [
        //interactionPlugin,
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
    };



    componentDidMount() {

        const trainerCode = JSON.parse(localStorage["userDetails"]).TrainerCode;
        fetch("http://proj.ruppin.ac.il/igroup7/proj/api/RequestDetails/getTrainerRequests/" + trainerCode + '/',{
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

        res && res.filter((event)=>(event.IsHistory===false && event.IsAprrovedByTrainer == "initial" && event.RequestStatus == "open")).map(event =>{
        let e = {
           // title: 'החלפה חדשה',
            title: event.TypeName,
            start: event.ReplacementDate,
            end: event.ReplacementDate,
            backgroundColor: '#f56954',
            borderColor: '#f56954',
        }
        events.push(e);
        });

        res && res.filter((event)=>(event.IsHistory===false && event.IsAprrovedByTrainer == "true" && event.RequestStatus == "open")).map(event =>{
            let e = {
                //title: 'ממתינה לאישור',
                title: event.TypeName,
                start: event.ReplacementDate,
                end: event.ReplacementDate,
                backgroundColor: '#f39c12',
                borderColor: '#f39c12',
            }
            events.push(e);
            });

         res && res.filter((event)=>(event.IsHistory===false && event.RequestStatus == "approved" && event.IsAprrovedByTrainer == "true")).map((event) =>{
            let e = {
               // title: 'החלפה מאושרת',
                title: event.TypeName,
                start: event.ReplacementDate,
                end: event.ReplacementDate,
                backgroundColor:'#00a65a',
                borderColor: '#00a65a'
            }
            events.push(e);
        });

         res && res.filter((event)=>(event.IsHistory ===true && event.RequestStatus == "approved" && event.IsAprrovedByTrainer == "true")).map((event) =>{
            let e = {
               // title: 'החלפה היסטורית ',
                title: event.TypeName,
                start: event.ReplacementDate,
                end: event.ReplacementDate,
                backgroundColor: '#0073b7', 
                borderColor: '#0073b7'
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

    dayClick = date => {
        this.setState({
            selectedEvent: {
                date: date.dateStr
            }
        });
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
        const { externalEvents, selectedEvent } = this.state;
        return (
            <ContentWrapper>
                <div className="calendar-app">

                     <div>
                    <h6 style={{textAlign:'right'}}>
                        <lable style={{backgroundColor:'#f56954',margin:'5px'}}>החלפה חדשה</lable>
                        <lable style={{backgroundColor: '#f39c12',margin:'5px'}}>החלפה ממתינה לאישור</lable>
                        <lable style={{backgroundColor: '#00a65a',margin:'5px'}}>החלפה מאושרת</lable>
                        <lable style={{backgroundColor: '#0073b7',margin:'5px'}}>החלפה היסטורית</lable>
                        
                    </h6>
                    </div>

                    <div className="row">
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

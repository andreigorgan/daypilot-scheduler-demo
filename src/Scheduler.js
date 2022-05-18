import React, {Component} from 'react';
import {DayPilotScheduler, SchedulerEventClickArgs} from "daypilot-pro-react";
import * as ReactDOMServer from 'react-dom/server';
import Zoom from "./Zoom";

class Scheduler extends Component {

    constructor(props) {
        super(props);
        this.onEventClicked = this.onEventClicked.bind(this);
        this.state = {
            selectedClusterId: null,
            config: {
                startDate: "2021-06-01",
                days: 365,
                scale: "Day",
                timeHeaders: [
                    {groupBy: "Year"},
                    {groupBy: "Month", format: "MMM"},
                    {groupBy: "Week"},
                    {groupBy: "Day", format: "d"}
                ],
                cellWidthSpec: "Fixed",
                cellWidth: 50,
                useEventBoxes: "Never",
                durationBarVisible: false,
                treeEnabled: true,
                eventMoveHandling: "Disabled",
                eventResizeHandling: "Disabled",
                eventDeleteHandling: "Disabled",
                eventClickHandling: "Enabled",
                onEventClicked: this.onEventClicked,
                allowMultiSelect: false,
                rowHeaderColumns: [
                    {name: "Car"}
                ],
                resources: [
                    {
                        name: "Convertible", id: "G2", expanded: true, children: [
                            {name: "MINI Cooper", seats: 4, doors: 2, transmission: "Automatic", id: "A", bubbleHtml: this.buildTooltip("A"), children: [
                                    {name: "MINI Cooper 1t tttttttttttttttttttttttttttttt", id: "MC1"},
                                    {name: "MINI Cooper 2", id: "MC2"},
                                ]},
                            {name: "BMW Z4", seats: 4, doors: 2, transmission: "Automatic", id: "B"},
                            {name: "Ford Mustang", seats: 4, doors: 2, transmission: "Automatic", id: "C"},
                            {name: "Mercedes-Benz SL ttttttttttttt", seats: 2, doors: 2, transmission: "Automatic", id: "D"},
                        ]
                    },
                    {
                        name: "SUV", id: "G1", expanded: true, children: [
                            {name: "BMW X1", seats: 5, doors: 4, transmission: "Automatic", id: "E"},
                            {name: "Jeep Wrangler", seats: 5, doors: 4, transmission: "Automatic", id: "F"},
                            {name: "Range Rover", seats: 5, doors: 4, transmission: "Automatic", id: "G"},
                        ]
                    },
                    {
                        name: "SUV", id: "G2", expanded: true, children: [
                            {name: "BMW X1", seats: 5, doors: 4, transmission: "Automatic", id: "E1"},
                            {name: "Jeep Wrangler", seats: 5, doors: 4, transmission: "Automatic", id: "F1"},
                            {name: "Range Rover", seats: 5, doors: 4, transmission: "Automatic", id: "G1"},
                        ]
                    },
                    {
                        name: "SUV", id: "G3", expanded: true, children: [
                            {name: "BMW X1", seats: 5, doors: 4, transmission: "Automatic", id: "E2"},
                            {name: "Jeep Wrangler", seats: 5, doors: 4, transmission: "Automatic", id: "F2"},
                            {name: "Range Rover", seats: 5, doors: 4, transmission: "Automatic", id: "G2"},
                        ]
                    },
                    {
                        name: "SUV", id: "G4", expanded: true, children: [
                            {name: "BMW X1", seats: 5, doors: 4, transmission: "Automatic", id: "E3"},
                            {name: "Jeep Wrangler", seats: 5, doors: 4, transmission: "Automatic", id: "F3"},
                            {name: "Range Rover", seats: 5, doors: 4, transmission: "Automatic", id: "G3"},
                        ]
                    },
                    {
                        name: "SUV", id: "G5", expanded: true, children: [
                            {name: "BMW X1", seats: 5, doors: 4, transmission: "Automatic", id: "E4"},
                            {name: "Jeep Wrangler", seats: 5, doors: 4, transmission: "Automatic", id: "F4"},
                            {name: "Range Rover", seats: 5, doors: 4, transmission: "Automatic", id: "G4"},
                        ]
                    },
                ],
                events: [
                    {
                        id: 99,
                        text: "Convertible",
                        start: "2021-06-02T20:00:00",
                        end: "2021-07-10T05:00:00",
                        resource: "G2",
                        clusterId: 'green',
                        container: 0,
                        bubbleHtml: this.buildTooltip('Convertible'),
                    },
                    {
                        id: 101,
                        text: "Reservation 101",
                        start: "2021-06-02T20:00:00",
                        end: "2021-06-10T05:00:00",
                        resource: "A",
                        clusterId: 'green',
                        container: 0,
                        bubbleHtml: this.buildTooltip('101'),
                    },
                    {
                        id: 201,
                        text: "OCF",
                        start: "2021-06-09T05:00:00",
                        end: "2021-06-10T05:00:00",
                        htmlRight: "OCF",
                        resource: "A",
                        clusterId: 'green',
                        cssClass: "milestone",
                        container: 0,
                        type: "Milestone",
                        backColor: "#f6b26b",
                        bubbleHtml: this.buildTooltip('OCF'),
                    },
                    {
                        id: 202,
                        text: "OCX",
                        start: "2021-06-09T05:00:00",
                        end: "2021-06-10T05:00:00",
                        resource: "A",
                        clusterId: 'green',
                        cssClass: "milestone",
                        type: "Milestone",
                        bubbleHtml: this.buildTooltip('OCX'),
                    },
                    {
                        id: 102,
                        text: "Reservation 102",
                        start: "2021-06-07T00:00:00",
                        end: "2021-06-25T11:00:00",
                        resource: "A",
                        clusterId: 'green'
                    },
                    {
                        id: 103,
                        text: "Reservation 103",
                        start: "2021-06-08T13:00:00",
                        end: "2021-06-20T00:00:00",
                        resource: "C",
                        backColor: "#f6b26b",
                        locked: true,
                        bubbleHtml: this.buildTooltip(103),
                    },
                    {
                        id: 104,
                        text: "Reservation 104",
                        start: "2021-06-02T00:00:00",
                        end: "2021-07-08T00:00:00",
                        resource: "E",
                        backColor: "#f6b26b",
                        plus: true,
                        bubbleHtml: this.buildTooltip(104),
                        locked: true,
                        other: 104
                    },
                    {
                        id: 105,
                        text: "Reservation 105",
                        start: "2021-06-03T00:00:00",
                        end: "2021-08-09T00:00:00",
                        resource: "G",
                        clusterId: 'green'
                    },
                    {
                        id: 106,
                        text: "Reservation 106",
                        start: "2021-06-18T13:00:00",
                        end: "2021-07-20T00:00:00",
                        resource: "B",
                        clusterId: 'green'
                    }
                ],
                onBeforeEventRender: args => {
                    if (!args.data.backColor) {
                        args.data.backColor = "#93c47d";
                    }
                    args.data.borderColor = "darker";
                    args.data.fontColor = "white";

                    if (this.state.selectedClusterId) {
                        if (this.state.selectedClusterId === args.data.clusterId) {
                            args.data.cssClass = args.data.cssClass ? args.data.cssClass + " selected" : "selected";
                        } else {
                            args.data.cssClass = args.data.cssClass ? args.data.cssClass + " not-selected" : "not-selected";
                        }
                    }
               },
                onBeforeRenderCell: (args) => {
                    if (this.state.config.scale === "Day" && (args.cell.start.getDayOfWeek() === 0 || args.cell.start.getDayOfWeek() === 6)) {
                        args.cell.backColor = "silver";
                    }
                }
            }
        };
    }

    zoomChange(args) {
        switch (args.level) {
            case "day":
                this.setState({
                    config: {
                        ...this.state.config,
                        scale: "Day",
                        timeHeaders: [
                            {groupBy: "Year"},
                            {groupBy: "Month", format: "MMM"},
                            {groupBy: "Week"},
                            {groupBy: "Day", format: "d"}
                        ]
                    }

                });
                break;
            case "week":
                this.setState({
                    config: {
                        ...this.state.config,
                        scale: "Week",
                        timeHeaders: [
                            {groupBy: "Year"},
                            {groupBy: "Month", format: "MMM"},
                            {groupBy: "Week"}
                        ]
                    }
                });

                break;
            default:
                throw new Error("Invalid zoom level");
        }
    }

    buildTooltip(id) {
        return ReactDOMServer.renderToString(
            <div>
                <ul>
                    <li>Id: {id}</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                </ul>
            </div>
        )
    }

    onEventClicked(event: SchedulerEventClickArgs) {
        this.setState({selectedClusterId: event.e.data.clusterId})
    }

    render() {
        const {...config} = this.state.config;
        return (
            <div>

                <div className="toolbar">
                    <Zoom onChange={args => this.zoomChange(args)}/>
                </div>
                <div className="scheduler-wrapper">
                <DayPilotScheduler
                    {...config}
                    onBeforeEventRender={this.state.config.onBeforeEventRender}
                    onBeforeCellRender = {this.state.config.onBeforeRenderCell}
                    onGridMouseDown={(args) => this.setState({selectedClusterId: null})}
                    ref={component => {
                        this.scheduler = component && component.control;
                    }}
                    event
                />
                </div>
            </div>
        );
    }
}

export default Scheduler;

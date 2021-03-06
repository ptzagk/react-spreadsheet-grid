import React from 'react';

import { storiesOf } from '@storybook/react';

import { Grid, Input, Select } from './../index';

const rows = [];
const positions = [];

for (let i = 0; i < 1000; i++) {
    rows.push({
        id: i,
        firstName: 'First name ' + i,
        secondName: 'Second name ' + i,
        positionId: 3,
        age: i
    });
}

for (let i = 1; i < 6; i++) {
    positions.push({
        id: i,
        name: 'Long Position Name ' + i
    });
}

class DataTable extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            rows
        };
    }

    onFieldChange(rowId, field, value) {
        rows[rowId][field] = value;

        this.setState({
            rows: [].concat(rows),
            blurFocus: true
        });
    }

    render() {
        return (
            <div className="DataTable">
                <Grid
                    columns={[
                        {
                            title: 'First name',
                            value: (row, {focus}) => {
                                return (
                                    <Input
                                        value={row.firstName}
                                        focus={focus}
                                        onBlur={this.onFieldChange.bind(this, row.id, 'firstName')}
                                    />
                                );
                            },
                            id: 'firstName'
                        },
                        {
                            title: 'Second name',
                            value: (row, {focus}) => {
                                return (
                                    <Input
                                        value={row.secondName}
                                        focus={focus}
                                        onBlur={this.onFieldChange.bind(this, row.id, 'secondName')}
                                    />
                                );
                            },
                            id: 'secondName'
                        },
                        {
                            title: 'Position',
                            value: (row, {focus}) => {
                                return (
                                    <Select
                                        selectedId={row.positionId}
                                        isOpen={focus}
                                        items={positions}
                                        onChange={this.onFieldChange.bind(this, row.id, 'positionId')}
                                    />
                                );
                            },
                            id: 'position'
                        },
                        {
                            title: 'Age',
                            value: (row, {focus}) => {
                                return (
                                    <Input
                                        value={row.age}
                                        focus={focus}
                                        onBlur={this.onFieldChange.bind(this, row.id, 'age')}
                                    />
                                );
                            },
                            id: 'age'
                        }
                    ]}
                    rows={rows}
                    blurCurrentFocus={this.state.blurFocus}
                    getRowKey={row => row.id}
                    rowHeight={50}
                    isColumnsResizable
                    disabledCellChecker={(row, columnId) => {
                        return columnId === 'age';
                    }}
                />
            </div>
        )
    }
}

storiesOf('Examples 1', module)
    .add('Data grid', () => <DataTable />);
import React, {Component, Fragment} from 'react';
import {
   Col,
   Button,
   CardHeader,
   Card,
   CardBody,
 DropdownItem, DropdownToggle, DropdownMenu,
   UncontrolledButtonDropdown,
   Modal, ModalHeader, ModalBody, ModalFooter

} from 'reactstrap';


import ReactTable from "react-table";

import {
    ResponsiveContainer
} from 'recharts';


export default class IncomeReport2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          item:[]
      };
      this.matpel = this.matpel.bind(this);

  }


  matpel() {
    this.setState({
      modal: !this.state.modal
  });
}
render() {
  const { items } = this.state;
 const closeBtn = <button className="close" onClick={this.matpel}>&times;</button>;
 
 return (
 <Fragment>
 <div className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0">
 <ResponsiveContainer width="100%" height="100%">
 <Col sm="12" md="12" xl="12">
 <Card className="mb-3">
 <CardHeader className="card-header-tab">
 <div>

 <Button color="warning" onClick={this.Matpel}>Tambah Data Pelajaran</Button>

{/* Modal tambah Pelajaran */}

<Modal isOpen={this.state.modal} toggle={this.tguru} className={this.props.className}>
<ModalHeader toggle={this.toggle} close={closeBtn}>Modal title</ModalHeader>
<ModalBody>
Penambahan Pelajaran
</ModalBody>
<ModalFooter>
<Button color="link" onClick={this.guru}>Cancel</Button>
<Button color="primary" onClick={this.tguru}>Do Something</Button>{' '}
</ModalFooter>
</Modal>

{/* END Modal tambah Pelajaran */}


</div>
<div className="btn-actions-pane-right actions-icon-btn">
<UncontrolledButtonDropdown>
<DropdownToggle className="btn-icon btn-icon-only" color="link">
<i className="pe-7s-menu btn-icon-wrapper"/>
</DropdownToggle>
<DropdownMenu
className="dropdown-menu-right rm-pointers dropdown-menu-shadow dropdown-menu-hover-link">
<DropdownItem header>Header</DropdownItem>
<DropdownItem>
<i className="dropdown-icon lnr-inbox"> </i>
<span>Menus</span>
</DropdownItem>
<DropdownItem>
<i className="dropdown-icon lnr-file-empty"> </i>
<span>Settings</span>
</DropdownItem>
<DropdownItem>
<i className="dropdown-icon lnr-book"> </i>
<span>Actions</span>
</DropdownItem>
<DropdownItem divider/>
<div className="p-3 text-right">
<Button className="mr-2 btn-shadow btn-sm" color="link">View Details</Button>
<Button className="mr-2 btn-shadow btn-sm"
color="primary">Action</Button>
</div>
</DropdownMenu>
</UncontrolledButtonDropdown>
</div>
</CardHeader>
<CardBody>
<ReactTable
columns={[
    {
        Header: "Name",
        columns: [
        {
            Header: "First Name",
            accessor: ""
        },
        {
            Header: "Last Name",
            id: "",

        }
        ]
    },
    {
        Header: "Info",
        columns: [
        {
            Header: "Age",
            accessor: ""
        }
        ]
    }
    ]}
    defaultPageSize={20}
    style={{
        height: "428px" // This will force the table body to overflow and scroll, since there is not enough room
    }}
    className="-striped -highlight -fixed"
    />
    </CardBody>
    </Card>
    </Col>
    </ResponsiveContainer>
    </div>
    </Fragment>
    )
}
}

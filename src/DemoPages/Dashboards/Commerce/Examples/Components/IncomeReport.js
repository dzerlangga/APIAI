import React, {Component, Fragment} from 'react';
import {Col,Button,CardHeader,Card,CardBody,Input,Modal,ModalHeader,ModalBody,ModalFooter,Form,FormGroup,Label,} from "reactstrap";
import ReactTable from "react-table";
import { ResponsiveContainer } from 'recharts';

export default class IncomeReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          items: [],
          editdata: null,
          edit: false
        };
        
        this.tguru = this.tguru.bind(this);
        this.editguru = this.editguru.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/photos")
        .then(res => res.json())
        .then(parsedJSON => parsedJSON.map(data => (
            {
                album: data.albumId,
                id: data.id,
                title: data.title,
                status: data.url,
                gambar: data.thumbnailUrl
            }
            )))
            .then(items => this.setState({
                items,
                isLoaded: false
            }))
            .catch(error => alert('gagal mengambil data API', error))
        }
        
        tguru() {
            this.setState({
                modal: !this.state.modal
            });
        }
        
        editguru(items) {
            this.setState({
                editdata: items.original,
                edit: !this.state.edit
            });
        }
        
        handleChange(albumId, value) {
            var d = Object.assign({}, this.state.editdata)
            Object.assign(d, { [albumId]: value })
            this.setState({
                editdata: d
            });
            setTimeout(() => {
            console.log(this.state)
        }, 1500)
    }

    deletedata(id){
      console.log(id);
      const { items } = this.state;
       this.setState({
        items:items.filter(item => item.id !== id)
      })

    }

  dataedit(id,value){
    // const API = 'https://jsonplaceholder.typicode.com/photos';
    //   const dataform = new dataform();
    //   dataform.append('albumId',value);
      
    //   const option = {
    //     method:'post',
    //     body: dataform
    //   }

    //   fetch(API,option)
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       this.setState({
    //         response: result,
    //       })
    //     }
    //   )
    console.log(value);

    }


render() {

    const { items } = this.state;

   return (

     <Fragment>

{/* MODAL */}

{/* Modal tambah Guru */}

           <Modal isOpen={this.state.modal} toggle={this.tguru} className={this.props.className}>

               <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>

               <ModalBody>
                   <Form>

                       <FormGroup row>
                           <Label for="exampleEmail" sm={4} size="lg">ID Album</Label>
                           <Col sm={8}>
                               <Input type="email" name="email" id="exampleEmail" placeholder="ID Album" />
                           </Col>
                       </FormGroup>

                       <FormGroup row>
                           <Label for="exampleEmail" sm={4} size="lg">ID</Label>
                           <Col sm={8}>
                               <Input type="email" name="email" id="exampleEmail" placeholder="Id"  />
                           </Col>
                       </FormGroup>

                       <FormGroup row>
                           <Label for="exampleEmail" sm={4} size="lg">Title</Label>
                           <Col sm={8}>
                               <Input type="email" name="email" id="exampleEmail" placeholder="Title"  />
                           </Col>
                       </FormGroup>

                       <FormGroup row>
                           <Label for="exampleEmail2" sm={4}>URL</Label>
                           <Col sm={8}>
                               <Input type="email" name="email" id="exampleEmail2" placeholder="Link URL" />
                           </Col>
                       </FormGroup>

                       <FormGroup row>
                           <Label for="exampleEmail" sm={4} size="lg">thumbnailUrl</Label>
                           <Col sm={8}>
                               <Input type="email" name="email" id="exampleEmail" placeholder=""  />
                           </Col>
                       </FormGroup>

                   </Form>
               </ModalBody>

               <ModalFooter>
                   <Button color="danger" onClick={this.tguru}>Cancel</Button>
                   <Button color="primary" onClick={this.tguru}>Do Something</Button>{" "}
               </ModalFooter>

           </Modal>

{/* END Modal tambah Guru */}

{/* Modal Edit Guru */}

           <Modal isOpen={this.state.edit} toggle={this.editguru} className={this.props.className}>
               <Form >
                   <ModalHeader toggle={this.editguru}  >Modal title</ModalHeader>
               <ModalBody>
                   
                       <FormGroup row>
                           <Label for="exampleEmail" sm={2}>ID</Label>
                           <Col sm={10}>
                               <Input type="text" id="id" value={this.state.editdata ? this.state.editdata.id : ""}
                               onChange={(d) => this.handleChange('id', d.target.value)} 
                               name="album" />
                           </Col>
                       </FormGroup>

                       <FormGroup row>
                           <Label for="exampleEmail" sm={2}>ID Album</Label>
                           <Col sm={10}>
                               <Input type="text" value={this.state.editdata ? this.state.editdata.album : ""}
                                   onChange={(d) => this.handleChange('album', d.target.value)}
                                   name="album" />
                           </Col>
                       </FormGroup>

                       <FormGroup row>
                           <Label for="exampleEmail" sm={2}>Title</Label>
                           <Col sm={10}>
                               <Input type="text" value={this.state.editdata ? this.state.editdata.title : ""}
                                   onChange={(d) => this.handleChange('title', d.target.value)}
                                   name="album" />
                           </Col>
                       </FormGroup>

                       <FormGroup row>
                           <Label for="exampleEmail2" sm={2}>URL 1</Label>
                           <Col sm={10}>
                               <Input type="text" name="email" value={this.state.editdata ? this.state.editdata.status : ""} 
                               onChange={(d) => this.handleChange('status', d.target.value)} placeholder="default" />
                           </Col>
                       </FormGroup>

                       <FormGroup row>
                           <Label for="exampleEmail2" sm={2}>URL 2</Label>
                           <Col sm={10}>
                               <Input type="text" name="email" value={this.state.editdata ? this.state.editdata.gambar : ""}
                                   onChange={(d) => this.handleChange('gambar', d.target.value)} placeholder="default" />
                           </Col>
                       </FormGroup>

                  
               </ModalBody>

               <ModalFooter>
             <Button color="primary" value={this.state.editdata ? this.state.editdata.id : ""} onClick={(a) => this.dataedit('id', a.target.value)}>Edit</Button>
                   <Button color="danger" onClick={this.editguru}>Cancel</Button>
               </ModalFooter>
               </Form>
           </Modal>

{/* END Modal Edit Guru */}



       <div className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0">
         <ResponsiveContainer width="100%" height="100%">
           <Col sm="12" md="12" xl="12">

             <Card className="mb-3">

               <CardHeader className="card-header-tab">
                 <div>
                   <Button color="danger" onClick={this.tguru}>
                     Tambah Data Guru
                   </Button>
                 </div>
               </CardHeader>

               <CardBody>
                 <ReactTable
                   data={items}
                   columns={[
                     {
                       Header: "Name",
                       columns: [
                         {
                           Header: "ID Album",
                           accessor: "album"
                         },
                         {
                           Header: "ID",
                           accessor: "id"
                         }
                       ]
                     },
                     {
                       Header: "Info",
                       columns: [
                         {
                           Header: "Title",
                           accessor: "title"
                         },
                         {
                           Header: "Aksi",
                           accessor: "id",
                           Cell: row => (
                             <div className="d-block w-100 text-center">
                               <Button outline className="mb-2 mr-2 btn-dashed btn-shadow-info active" onClick={() => this.editguru(row)} color="info">
                                 <i className="pe-7s-look" />
                               </Button>
                               <Button outline className="mb-2 mr-2 btn-dashed btn-shadow-danger active" onClick={() => this.deletedata(row.original.id)}  color="danger">
                                 <i className="pe-7s-trash" />
                               </Button>
                             </div>
                           )
                         }
                       ]
                     }

                   ]}
                   defaultPageSize={20}
                   style={{ height: "428px"}}
                   className="-striped -highlight -fixed"
                 />
               </CardBody>

             </Card>

           </Col>
         </ResponsiveContainer>
       </div>

     </Fragment>
   );
}
}

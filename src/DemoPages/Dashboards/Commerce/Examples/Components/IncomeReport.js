import React, {Component, Fragment} from 'react';
import {Col,Button,CardHeader,Card,CardBody,Input,Modal,ModalHeader,ModalBody,ModalFooter,Form,FormGroup,Label,} from "reactstrap";
import ReactTable from "react-table";
import { ResponsiveContainer } from 'recharts';
import axios from 'axios';

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
        this.dataedit = this.dataedit.bind(this);
    }
    
    componentDidMount() {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(parsedJSON => parsedJSON.map(data => (
            {
                id: data.id,
                name: data.name,
                username: data.username,
                email: data.email,
               phone: data.phone
               
            }
            )))
            .then(items => this.setState({
                items,
                isLoaded: false
            }))
            .catch(error => alert('gagal mengambil data API', error))
        }
        
        tambahguru(){
          const post = {
            id: this.state.editdata.id,
            email: this.state.editdata.email,
            phone: this.state.editdata.phone,
            username: this.state.editdata.username,
            name: this.state.editdata.name,
          }

          axios.post('https://jsonplaceholder.typicode.com/users',post)
            .then(response => {
              if (response.status === 201) {

                let postId = response.data;
                const newPost = Object.assign({}, response.data.post, postId)

                this.setState(prevState => ({
                  items: [...prevState.items, newPost]
                }))
              }
            })
      }

      dataedit(){
        const post = {
          id: this.state.editdata.id,
          email: this.state.editdata.email,
          phone: this.state.editdata.phone,
        username: this.state.editdata.username,
           name: this.state.editdata.name,
      }
    
       axios.put('https://jsonplaceholder.typicode.com/users/1' , post)
        .then(response => {
       let postId = this.state.editdata.id;
      const items = [...this.state.items];
      const edit = items.findIndex(item => postId === item.id)
      items[edit] = response.data;
      this.setState({
        items
      })
    })
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
  
  handleChange(id, value) {
      var d = Object.assign({}, this.state.editdata)
      Object.assign(d, { [id]: value })
      this.setState({
          editdata: d
      });
      setTimeout(() => {
      console.log(this.state)
  }, 1500)
}

deletedata(id){
// console.log(id);
const { items } = this.state;
 this.setState({
  items:items.filter(item => item.id !== id)
})

}
  
render() {

    const { items } = this.state;

   return (

     <Fragment>

{/* MODAL */}

{/* Modal tambah Guru */}

           <Modal isOpen={this.state.modal} toggle={this.tguru} className={this.props.className}>
           <Form>
               <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>

               <ModalBody>
                  
             <FormGroup>
               <Col sm={8}>
                 <Input type="hidden" id="id" value={this.state.editdata ? this.state.editdata.id : ""}
                   onChange={(d) => this.handleChange('id', d.target.value)}
                   name="album" />
               </Col>
             </FormGroup>

             <FormGroup>
               <Label for="exampleEmail" sm={4}>ID Album</Label>
               <Col sm={8}>
                 <Input type="text" value={this.state.editdata ? this.state.editdata.name : ""}
                   onChange={(d) => this.handleChange('album', d.target.value)}
                   name="album" />
               </Col>
             </FormGroup>

             <FormGroup>
               <Label for="exampleEmail" sm={4}>Title</Label>
               <Col sm={8}>
                 <Input type="text" value={this.state.editdata ? this.state.editdata.phone  : ""}
                   onChange={(d) => this.handleChange('title', d.target.value)}
                   name="album" />
               </Col>
             </FormGroup>

             <FormGroup>
               <Label for="exampleEmail2" sm={4}>URL 1</Label>
               <Col sm={8}>
                 <Input type="text" name="email" value={this.state.editdata ? this.state.editdata.phone : ""}
                   onChange={(d) => this.handleChange('status', d.target.value)} placeholder="default" />
               </Col>
             </FormGroup>

             <FormGroup>
               <Label for="exampleEmail2" sm={4}>URL 2</Label>
               <Col sm={8}>
                 <Input type="text" name="email" value={this.state.editdata ? this.state.editdata.gambar : ""}
                   onChange={(d) => this.handleChange('gambar', d.target.value)} placeholder="default" />
               </Col>
             </FormGroup>

                   
               </ModalBody>

               <ModalFooter>
                   <Button color="danger" onClick={this.tguru}>Cancel</Button>
             <Button color="primary" onClick={(d) => this.tambahguru(d.target.value)}>Simpan</Button>{" "}
               </ModalFooter>
              </Form>
           </Modal>

{/* END Modal tambah Guru */}

{/* Modal Edit Guru */}

           <Modal isOpen={this.state.edit} toggle={this.editguru} className={this.props.className}>
               <Form>
                   <ModalHeader toggle={this.editguru} >Modal title</ModalHeader>
               <ModalBody>

                       <FormGroup row>
                           <Label for="exampleEmail" sm={4}>Nama</Label>
                           <Col sm={8}>
                 <Input type="hidden" id="id" value={this.state.editdata ? this.state.editdata.id : ""}
                   onChange={(d) => this.handleChange('id', d.target.value)}
                   name="ID" />
                               <Input type="text" value={this.state.editdata ? this.state.editdata.name : ""}
                                   onChange={(d) => this.handleChange('name', d.target.value)}
                                   name="idalbum" />
                           </Col>
                       </FormGroup>

                       <FormGroup row>
                           <Label for="exampleEmail" sm={4}>No hp</Label>
                           <Col sm={8}>
                               <Input type="text" value={this.state.editdata ? this.state.editdata.phone : ""}
                                   onChange={(d) => this.handleChange('phone', d.target.value)}
                                   name="album" />
                           </Col>
                       </FormGroup>

                       <FormGroup row>
                           <Label for="exampleEmail2" sm={4}>Username</Label>
                           <Col sm={8}>
                               <Input type="text" name="email" value={this.state.editdata ? this.state.editdata.username : ""} 
                               onChange={(d) => this.handleChange('username', d.target.value)} placeholder="default" />
                           </Col>
                       </FormGroup>

                       <FormGroup row>
                           <Label for="exampleEmail2" sm={4}>Email</Label>
                           <Col sm={8}>
                               <Input type="text" name="email" value={this.state.editdata ? this.state.editdata.email : ""}
                                   onChange={(d) => this.handleChange('email', d.target.value)} placeholder="default" />
                           </Col>
                       </FormGroup>

                  
               </ModalBody>

               <ModalFooter>
             <Button color="primary" value={this.state.editdata ? this.state.editdata.id : ""} onClick={(a) => this.dataedit('id', a.target.value) }>Edit</Button>
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
                       Header: "Identitas",
                       columns: [
                         {
                           Header: "ID",
                           accessor: "id",
                         },
                         {
                           Header: "Name",
                           accessor: "name",
                         },
                         {
                           Header: "No HP",
                           accessor: "phone",
                         }
                       ]
                     },
                     {
                       Header: "Info",
                       columns: [
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

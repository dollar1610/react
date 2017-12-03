import React, { Component } from 'react';
import '../../../public/bootstrap/css/bootstrap.min.css';
import { PageHeader, Table, Button} from 'react-bootstrap';
import Modals from './buttons/modal';
import Product_list from './product_container';

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prodList : []
        };
        this.delete_prod = this.delete_prod.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    componentWillMount() {
        this.loadData();
    }

    delete_prod() {
        const urll = '/api/products/{id}';
        fetch(urll, {
            method: 'delete'
        });
    }

    loadData() {
      const prodList = [];
      const urll = 'api/products';

      fetch(urll)
          .then((response) => {
          response.json()
              .then((data) => {
              for (let i = 0; i < data.length; i++) {
                  prodList.push({
                      id: data[i].id,
                      name: data[i].name,
                      price: data[i].price
                  });
              }
              this.setState({ prodList });
          })
      });
    }

    render () {
        return (
            <div>
                <div className='container'>
                    <PageHeader className="hd">
                        Product list
                        <Modals loadData={this.loadData} />
                    </PageHeader>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <Product_list  data = {this.state.prodList}/>
                    </Table>
                </div>
            </div>
        )
    }
}
console.log(Products);

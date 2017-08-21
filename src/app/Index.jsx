import React from 'react';
import {render} from 'react-dom';
import Axios from 'axios';


var instance = Axios.create({
    baseURL: 'https://api.mcmakler.de/v1',
    timeout: 10000
});

export class Index extends React.Component {


    constructor() {
        super();
        this.state = { properties: [] };
    }

    componentDidMount() {

        // Get Properties data

        instance.get('/advertisements').then(res => {

            const properties = res.data.data.slice(0,10);
            console.dir(properties);
            this.setState({ properties });

        }).catch(function(error){


        });

    }



    render() {

        return(
            <div className="properties">

                {this.state.properties.length ?
                    this.state.properties.map(property=>

                        <div key={property._id.$id} className="property">
                            <div className="inner">
                                <div className="image">
                                    <img src={property.advertisementAssets[0].advertisementThumbnails.inventory_m.url} />
                                    <div className="info">
                                        <div className="price">${property.advertisementPrice.sellPrice}</div>
                                        <div className="city">{property.realestateSummary.address.city}</div>
                                    </div>
                                </div>
                                <div className="content">
                                    <div className="title">{property.title}</div>
                                    <div className="street">
                                        <i className="fa fa-map-marker"></i> {property.realestateSummary.address.street}
                                    </div>
                                </div>
                                <div className="footer">
                                    <div className="rooms">
                                        <i className="fa fa-bed"></i> {property.realestateSummary.numberOfRooms} rooms
                                    </div>
                                    <div className="space">
                                        <i className="fa fa-object-ungroup"></i>
                                        {property.realestateSummary.space.toFixed(2)} m² area
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                    : <div>Loading...</div>
                }
            </div>

        );
    }
}

render(<Index/>, document.getElementById("list"));
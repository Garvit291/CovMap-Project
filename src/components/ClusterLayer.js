import React from 'react';
import { render } from 'react-dom';
import {Layer} from 'react-map-gl';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer,unclusteredCountLayer} from './layers';

class ClusterLayer extends React.Component{
    sourceId = this.props.sourceId;
    type = this.props.type;
    render(){
        return (
        <>
            <Layer {...clusterLayer(this.sourceId,this.type)} />
            <Layer {...clusterCountLayer(this.sourceId,this.type)} />
            <Layer {...unclusteredPointLayer(this.sourceId,this.type)} />
            <Layer {...unclusteredCountLayer(this.sourceId,this.type)} />
        </>
        );
    }
}

export default ClusterLayer;
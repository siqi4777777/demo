import { Row, Col, Avatar, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Moment from 'react-moment';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Profile(props) {
   const { match: { params } } = props;
   const [player, setPlayer] = useState({ sports: [] });
   let tags;

   //Get the data from the express server
   useEffect(() => {
      axios.post('http://localhost:4000/' + params.id)
         .then(function (res) {

            setPlayer(res.data)
            console.log(player)
         })
         .catch(function (err) {
            // handle error
            console.log(err);
         })
   }, [])

   //Create the Tags
   tags = player.sports.map((sport) => <Tag style={{ fontSize: ".5em" }} color="blue">{sport}</Tag>)

   return (
      <div className="profile">
         <Row justify="center" style={{ paddingTop: "30px" }}>
            <Col><Avatar size={200} icon={<UserOutlined />} /></Col>
         </Row>
         <Row size="middle" justify="center" >
            <Col><span style={{ fontSize: "6em" }}>{player.name}</span></Col><br></br>
         </Row>
         <Row size="middle" justify="center" >
            <Col><span style={{ fontSize: "4em" }}>Birthday: <Moment format="YYYY-MM-DD">{player.dob}</Moment></span></Col>
         </Row>
         <Row size="middle" justify="center" >
            <Col><span style={{ fontSize: "4em" }}>Gender: {player.gender}</span></Col>
         </Row>
         <Row size="middle" justify="center" >
            <Col><span style={{ fontSize: "4em" }}>Location: {player.location}</span></Col>
         </Row>
         <Row size="middle" justify="center" >
            <Col><span style={{ fontSize: "4em" }}>Sports: {tags}</span></Col>
         </Row>
         <Row size="middle" justify="center" >
            <Col><span style={{ fontSize: "4em" }}>Team: {player.team}</span></Col>
         </Row>
         <Row size="middle" justify="center" >
            <Col><span style={{ fontSize: "4em" }}>Description: {player.description}</span></Col>
         </Row>
      </div >
   );
}

export default Profile;

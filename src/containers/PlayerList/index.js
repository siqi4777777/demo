import { Table, Button, Layout, Tag } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Moment from 'react-moment';
import { Content } from 'antd/lib/layout/layout';

const columns = [
   {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
   },
   {
      title: 'Sports',
      dataIndex: 'sports',
      key: 'sports',
      render: tags => (
         <>
            {tags.map(tag => (
               <Tag color="blue" key={tag}>
                  {tag}
               </Tag>
            ))}
         </>
      ),
   },
   {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
   },
   {
      title: 'Date Of Birth',
      dataIndex: 'dob',
      key: 'dob',
   },
   {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
   },
   {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
   },
   {
      title: 'Team',
      dataIndex: 'team',
      key: 'team',
   },
];

function PlayerList(props) {
   let history = useHistory();
   let data = [];

   const [players, setPlayers] = useState([]);

   useEffect(() => {
      axios.get('http://localhost:4000/playerlist')
         .then(function (res) {
            // handle success
            for (var key in res.data) {
               let player = res.data[key]
               if (res.data.hasOwnProperty(key)) {
                  let dobdata = <Moment format="YYYY-MM-DD">{player.dob}</Moment>
                  let dataEntry = {
                     id: player._id,
                     name: player.name,
                     sports: player.sports,
                     gender: player.gender,
                     dob: dobdata,
                     location: player.location,
                     description: player.description,
                     team: player.team,
                  }
                  data.push(dataEntry)
               }
            }
            setPlayers(data)
         })
         .catch(function (err) {
            // handle error
            console.log(err);
         })

   }, []);


   return (
      <div style={{ marginLeft: '6em', marginRight: '6em' }}>
         <div className="player-list">
            <div style={{ fontSize: "6em" }}>Athlete Profile</div>
            <Table columns={columns} dataSource={[...players]} onRow={(r) => ({
               onClick: () => history.push("/" + r.id)
            })} />
            <Button type='primary' size='large' style={{ bottom: "1px", marginTop: 8 }}><Link to="/newprofile">Add New Athlete Profile</Link></Button>
            {/* marginLeft: '45px', */}
         </div >
      </div>
   );
}

export default PlayerList;
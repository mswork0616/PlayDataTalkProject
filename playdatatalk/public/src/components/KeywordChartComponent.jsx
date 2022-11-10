import React, { Component } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from "recharts";
import BoardService from 'service/BoardService';

class KeywordChartComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            keyword: [
                {
                  name: '', keyword: ''
                },
                {
                  name: '', keyword: ''
                },
                {
                  name: '', keyword: ''
                },
                {
                  name: '', keyword: ''
                },
                {
                  name: '', keyword: ''
                }
              ]
        }

    }

    componentDidMount() {
      BoardService.countkeyword().then((res) => {
          console.log(res.data[0]);
          this.setState({ keyword: [
            {
              name: res.data[0].keyword1, keyword: res.data[0].count
            },
            {
              name: res.data[1].keyword1, keyword: res.data[1].count
            },
            {
              name: res.data[2].keyword1, keyword: res.data[2].count
            },
            {
              name: res.data[3].keyword1, keyword: res.data[3].count
            },
            {
              name: res.data[4].keyword1, keyword: res.data[4].count
            }
          ] });
      });
  }

    render() {
      const title = {
        marginBottom: "20px",
        fontSize: 40
      }
        return (
            <div className='keywordRankForm'>
                <h1 style={title}>오늘의 키워드</h1>
                <BarChart width={730} height={450} data={this.state.keyword}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="keyword" fill="#504197" />
                </BarChart>
            </div>
        );
    }
}
export default KeywordChartComponent;
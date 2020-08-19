import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "../../mainPage/view/BestDiscountItem.css";

import {
  Grid,
  Image,
  Card,
  Icon,
  Rail,
  Label,
  Header,
} from "semantic-ui-react";

const imageSize = {
  width: "100%",
  height: "170px",
};

const railDiscount = {
  background: "red",
  color: "#ffffff",
  fontSize: "16px",
};

@inject("Store")
@observer
class ResultContainer extends Component {
  starCount = (rating) => {
    let start = [];
    for (var i = 0; i < rating; i++) {
      start = start.concat(<Icon name="star" color="yellow" />);
    }
    return start;
  };
  render() {
    const resultList = this.props.Store.list.getResultList;

    const results = resultList.map((item) => {
      return (
        <Grid.Column key={item.id}>
          <Card color="#f5e5d5" as="a" href={`/detail?id=${item.id}`}>
            <Card.Content>
              <Image src={item.imgUrl} style={imageSize} />
              <Card.Header
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: "17px",
                  paddingTop: "7px",
                }}
              >
                {item.name}
              </Card.Header>
              <Card.Meta>
                <span
                  style={{
                    textDecoration: "line-through",
                    textDecorationColor: "gray",
                    fontSize: "13px",
                    fontColor: "gray",
                  }}
                >
                  {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </span>
              </Card.Meta>
              <Card.Content>
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "15px;",
                  }}
                >
                  {(item.price * (100 - item.discount) * 0.01)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  &nbsp;원
                </span>
              </Card.Content>

              <Rail
                attached
                internal
                position="left"
                style={{ top: "3%", left: "-8px" }}
              >
                <Label style={railDiscount}>{item.discount}%</Label>
              </Rail>
              <Card.Description style={{ color: "#3080DF" }}>
                판매수 {item.sale}
                <br />
                {this.starCount(item.rating)}
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      );
    });

    return (
      <Grid style={{ marginTop: "19px" }}>
        <Header
          as="h5"
          icon="search"
          content="검색결과"
          style={{ marginTop: "10px" }}
        />
        <Grid.Row columns={4}>{results}</Grid.Row>
      </Grid>
    );
  }
}

export default ResultContainer;

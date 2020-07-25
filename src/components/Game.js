import React, { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Item from './Item'
import cookieSrc from "../cookie.svg"

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
]

export default () => {
  const [numCookies, setNumCookies] = useState(100)
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0, grandma: 0, farm: 0,
  })

  const handleClick = ({ id, cost }) => {
    // 1. can u purchase?
    if (numCookies >= cost) {
      // 2.1 Yes => Deduct cookies.
      setNumCookies(prevValue => prevValue - cost)
      // 2.2 Yes => Increment item count in purchasedItems.
      setPurchasedItems(prevValue => {
        return { ...prevValue, [id]: prevValue[id] + 1 }
      })
    } else {
      // 3. No => Return an error with window.alert
      window.alert("Not enough cookies.")
    }
  }

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{}</strong> cookies per second
        </Indicator>
        <Button onClick={() => setNumCookies(prevValue => prevValue + 1)}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        { items.map(item => {
          return <Item
            key={item.id}
            item={item}
            purchasedItems={purchasedItems}
            handleClick={() => handleClick(item)}
          />
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`

const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`

const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`

const Cookie = styled.img`
  width: 200px;
`

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`
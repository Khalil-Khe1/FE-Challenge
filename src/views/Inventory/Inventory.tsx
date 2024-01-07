import { useState, useEffect } from 'react';

import { getModels } from '../../api/getModels';
import { AiModel } from '../../models/ai_model';

import { Container, Divider, Typography, Card } from "@mui/joy";
import { useNavigate } from 'react-router-dom';

import "../../../public/common.css"

const Inventory = () => {
  const [isData, setData] = useState({})
  const [isLoading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      return await getModels() //replace this with api call (js fetch or axios)
    }
    const execAll = async () => {
      const { data, loading } = await fetchData()
      setData(data)
      setLoading(loading)
    }
    execAll()
  }, []) //On Mount

  const getItem = (name: String) => {
    navigate("/analysis/" + name)
  }

  if (isLoading) return ( //Wait for data fetching
    <div>LOADING</div>
  )

  const cardSx = {
    "cursor": "pointer",
    "&:hover": {
      "border": "2px solid #22d3ee !important",
    }
  }

  const displayedData = Object.values(isData).map((item) => {
    const element = item as AiModel
    return (
      <Card key={element.model_name + "_key"} sx={cardSx} className="" onClick={() => getItem(element.model_name)}>
        <div className="flex justify-between">
          <div>{element.model_name}</div>
          <div>{element.model_type}</div>
        </div>
      </Card>
    )
  })

  return (
    <Container>
      <div className="flex flex-col gap-4 pt-4">
        <Typography level="h1">Inventory</Typography>
        <Divider></Divider>
        <div className="flex flex-col w-auto gap-4">
          {displayedData}
        </div>
      </div>
    </Container>
  );
};

export default Inventory

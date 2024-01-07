import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { getAnalysis } from '../../api/getAnalysis';

import { Container, Divider, Typography, Card } from "@mui/joy";
import { BarDatum, ComputedDatum, Bar } from '@nivo/bar'

const Analysis = () => {
    const [isData, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const params = useParams()

    interface AnalysisValue {
        PetalWidthCm: number;
        SepalWidthCm: number;
        PetalLengthCm: number;
        SepalLengthCm: number;
    }

    useEffect(() => {
        const fetchData = async () => {
            return await getAnalysis(params.name ? params.name : "") //replace this with api call (js fetch or axios)
        }
        const execAll = async () => {
            const { data, loading } = await fetchData()
            const formatted = data[0] ? data[0].map((item) => {
                const cast: AnalysisValue = item.value as AnalysisValue
                return {
                    origin: item.origin,
                    PetalWidthCm: cast.PetalWidthCm ? cast.PetalWidthCm : 0,
                    SepalWidthCm: cast.SepalWidthCm ? cast.SepalWidthCm : 0,
                    PetalLengthCm: cast.PetalLengthCm ? cast.PetalLengthCm : 0,
                    SepalLengthCm: cast.SepalLengthCm ? cast.SepalLengthCm : 0,
                }
            }) : []
            setData(formatted)
            setLoading(loading)
        }
        execAll()
    }, []) //On Mount
    if (isLoading) return (<div>LOADING</div>)

    const colors = {
        PetalWidthCm: "#3E9265",
        SepalWidthCm: "#4DA167",
        PetalLengthCm: "#3BC14A",
        SepalLengthCm: "#7DE789"
    }

    const formatPercentage = (item: ComputedDatum<BarDatum>): string => {
        return item.value ? `${(item.value * 100).toFixed(2)}%` : `0%`
    };

    const formatTooltip = (item: ComputedDatum<BarDatum>) => {
        return (
            <Card>
                {item.id + ' : ' + formatPercentage(item)}
            </Card>
        )
    }

    return (
        <Container>
            <div className="flex flex-col gap-4 pt-4 z-0">
                <Typography level="h1">{params.name}</Typography>
                <Divider></Divider>
                <div
                    className="flex flex-col gap-4 overflow-x-auto h-full w-full lg:overflow-hidden"
                    style={{ height: ((Object.values(isData).length * 165) + 50).toString() + "px" }}>
                    <Bar
                        margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
                        data={isData as BarDatum[]}
                        //labelFormat={formatPercentage}
                        label={formatPercentage}
                        tooltip={formatTooltip}
                        axisBottom={{
                            format: (value) => `${value * 100}%`
                        }}
                        theme={{
                            "axis": {
                                "domain": {
                                    "line": {
                                        "stroke": "#777777",
                                        "strokeWidth": 1
                                    }
                                },
                                "legend": {
                                    "text": {
                                        "fontSize": 14,
                                        "fill": "#333333",
                                        "outlineWidth": 0,
                                        "outlineColor": "transparent"
                                    }
                                },
                                "ticks": {
                                    "line": {
                                        "stroke": "#777777",
                                        "strokeWidth": 1
                                    },
                                    "text": {
                                        "fontSize": 16,
                                        "fill": "#333333",
                                        "outlineWidth": 6,
                                        "outlineColor": "transparent"
                                    }
                                }
                            },
                        }}
                        colors={(item) => {
                            return colors[item.id as keyof typeof colors]
                        }}
                        indexBy={"origin"}
                        keys={["PetalWidthCm", "SepalWidthCm", "PetalLengthCm", "SepalLengthCm"]}
                        layout="horizontal"
                        padding={0.2}
                        labelTextColor="inherit:darker(1.4)"
                        labelSkipWidth={16}
                        labelSkipHeight={16}
                        width={1100}
                        height={Object.values(isData).length * 165}
                    />

                </div>
            </div>
        </Container>
    )
}

export default Analysis
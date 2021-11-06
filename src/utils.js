import React from 'react';
import {Circle, Popup} from 'react-leaflet';
import numeral from 'numeral';

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 700,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 800,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 1200,
    },
};

export const sortData = (data,casesType) => {
    const sortedData = [...data];
    return sortedData.sort((a,b) => a[casesType] > b[casesType] ? -1 : 1)

};

export const prettyPrintStat = (stat) =>
    stat? `+${numeral(stat).format("0.0a")}`: "+0";

//DRAW circles on the map with interactive tooltop
export const showDataOnMap = (data, casesType='cases') =>
    data.map(district => (
        <Circle
            center={[parseFloat(district.districtInfo.latitude), parseFloat(district.districtInfo.longitude)]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(district[casesType]*100) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div className='info-container'>
                    <div className='info-name'>{district.district}</div>
                    <div className='info-confirmed'>Cases: {numeral(district.cases).format("0,0")}</div>
                    <div className='info-recovered'>Recovered: {numeral(district.recovered).format("0,0")}</div>
                    <div className='info-deaths'>Deaths: {numeral(district.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ));


export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
};

export const mutateFacilityStats = (facilities,facilitiesActive,facilitiesRecovered,facilitiesDeaths) => {
    let activeObj=  facilitiesActive.reduce((acc, curr) => {
        const { facility_id, count } = curr;


        if (!acc[facility_id]) {
            acc[facility_id] = {
                name: facilities[facility_id+1].name,
                active: 0,
                deaths: 0,
                recovered: 0,
            };
        }

        acc[facility_id]['active'] += count;
        return acc;
    }, {});
    let recoveredObj=  facilitiesRecovered.reduce((acc, curr) => {
        const { facility_id, count } = curr;


        if (!acc[facility_id]) {
            acc[facility_id] = {
                name: facilities[facility_id+1].name,
                active: 0,
                deaths: 0,
                recovered: 0,
            };
        }

        acc[facility_id]['recovered'] += count;
        return acc;
    }, activeObj);
    return facilitiesDeaths.reduce((acc, curr) => {
        const {facility_id, count} = curr;


        if (!acc[facility_id]) {
            acc[facility_id] = {
                name: facilities[facility_id + 1].name,
                active: 0,
                deaths: 0,
                recovered: 0,
            };
        }

        acc[facility_id]['deaths'] += count;
        return acc;
    }, recoveredObj);
};

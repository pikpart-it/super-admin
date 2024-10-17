import React, { useEffect, useState } from 'react'
import { H2Heading } from '../../../../components/styled';
import { FlexDiv } from '../../../../style/styled';
import { Input } from '@mui/joy';
import { Button } from '@mui/material';
import { ProductWrapper } from '../../../ProductManufacturer/Businessunits/component/AddBUForm';
import { config } from '../../../../config/config';
import { getAuthorized, postAuthorized, putAuthorized } from '../../../../services';
import ListRank from './ListRank';


const AddRankCreateAppMaster = () => {
    const [data, setData] = useState({
        rankCode: "",
        rankDescription: ""
    })
    const [rankData, setRankData] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [editedRankId, setEditedRankId] = useState("")
    const [loader, setloader] = useState({
        isLoading: false,
        error: false,
        msg: "",
    });

    const onSubmit = async () => {
        setloader({ ...loader, isLoading: true })
        let url = `${config.baseUrl}/superAdmin/addUserRank`
        const body = {
            rank_code: data?.rankCode,
            rank_description: data?.rankDescription
        }
        try {
            const resp = await postAuthorized(url, body)
            if (resp?.status === 200) {
                setloader({ ...loader, isLoading: false })
                setData({
                    rankCode: "",
                    rankDescription: ""
                })
                getRankData()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getRankData = async () => {
        let url = `${config.baseUrl}/superAdmin/userRanks`
        try {
            const resp = await getAuthorized(url)
            setRankData(resp?.data?.data)
        } catch (error) {
            console.log(error)
        }
    }
    const editHandler = (data) => {
        setIsEdit(true)
        setData({
            rankCode: data?.rankCode,
            rankDescription: data?.rankDescription
        })
        setEditedRankId(data?.id)
    }
    const onEdit = () => {
        onEditRankCode()
        onEditRankDescription()
    }
    const onEditRankDescription = async () => {
        let url = `${config.baseUrl}/superAdmin/updateRankDesc`
        const body = {
            id: editedRankId,
            rank_description: data?.rankDescription,
        }
        try {
            const resp = await putAuthorized(url, body)
            if (resp?.status === 200) {
                setloader({ ...loader, isLoading: false })
                setData({
                    rankCode: "",
                    rankDescription: ""
                })
                setIsEdit(false)
                getRankData()
            }
        } catch (error) {
            console.log(error)
        }

    }
    const onEditRankCode = async () => {
        let url = `${config.baseUrl}/superAdmin/updateUserRank`
        const body = {
            id: editedRankId,
            rank_code: data?.rankCode,
        }
        try {
            const resp = await putAuthorized(url, body)
            if (resp?.status === 200) {
                setloader({ ...loader, isLoading: false })
                setData({
                    rankCode: "",
                    rankDescription: ""
                })
                setIsEdit(false)
                getRankData()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteRank = async (id) => {
        let url = `${config.baseUrl}/superAdmin/deactivateUserRank`
        const body = {
            id: id
        }
        try {
            const resp = await putAuthorized(url, body)
            if (resp?.status === 200) {
                getRankData()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRankData()
    }, [])
    return (
        <div style={{ width: "90%", margin: "auto" }}>
            <FlexDiv justifyContentCenter style={{ marginTop: "1rem" }}>
                <div style={{ fontSize: "1.3rem", color: "#f65000" }}>{isEdit ? "Edit" : "Add"} Rank</div>
            </FlexDiv>
            <ProductWrapper style={{ background: "#fbfbfb", padding: "40px" }}>
                <FlexDiv justifyContentSpaceBetween style={{ width: "60%", margin: 'auto' }}>
                    <Input
                        placeholder='Rank Code'
                        value={data?.rankCode}
                        onChange={(e) => {
                            setData({
                                ...data,
                                rankCode: e?.target?.value
                            })
                        }} />
                    <Input
                        placeholder='Rank Description'
                        value={data?.rankDescription}
                        onChange={(e) => {
                            setData({
                                ...data,
                                rankDescription: e?.target?.value
                            })
                        }} />
                    <Button
                        variant="contained"
                        color="success"
                        onClick={isEdit ? onEdit : onSubmit}
                    >
                        {isEdit ? "Update" : "Submit"}
                    </Button>
                </FlexDiv>
            </ProductWrapper>
            <ListRank edit={editHandler} data={rankData} deleteRank={deleteRank} />
        </div>
    )
}

export default AddRankCreateAppMaster
import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { FlexDiv } from '../../../../style/styled';
import Table from '@mui/joy/Table';
import { Button, Switch } from '@mui/material';
import Input from '@mui/joy/Input';
import { config } from '../../../../config/config';
import { postAuthorized, putAuthorized } from '../../../../services';
import MsgCard from '../../../../components/MsgCard';
import { Loader } from '../../../../components/Loader';

const UpdateMasterConfigurationList = () => {
    const history = useHistory()
    const Data = history.location.state
    const [loader, setloader] = useState({
        isLoading: false,
        error: false,
        msg: "",
    });
    const [updateConfiglist, setUpdateConfigList] = useState<any>({
        isBottomMenu: Data?.isBottomMenu,
        isMenu: Data?.isMenu,
        prioritySeq: Data?.prioritySeq
    })
    const updateList = async () => {
        setloader({ ...loader, isLoading: true });
        let url = `${config.baseUrl}/superAdmin/updateMasterConfigurationPriority`
        const { prioritySeq, isBottomMenu, isMenu } = updateConfiglist
        const body = {
            id: Data?.id,
            seq_no: parseInt(prioritySeq),
            is_menu: isMenu,
            is_bottom_menu: isBottomMenu
        }
        try {
            const { data } = await postAuthorized(url, body)
            setloader({
                ...loader,
                isLoading: false,
                error: data?.error,
                msg: data?.message,
            });
            setTimeout(() => {
                setloader({ ...loader, msg: "" });
            }, 2000);
        } catch (error) {
            setloader({
                ...loader,
                isLoading: false,
                error: true,
                msg: "Something Went Wrong",
            });
            setTimeout(() => {
                setloader({ ...loader, msg: "" });
            }, 5000);
        }
    }
    const isEnabled = () => {
        const { prioritySeq, isBottomMenu, isMenu } = updateConfiglist
        if (!prioritySeq || !isBottomMenu || !isMenu) {
            return true
        } else {
            return false
        }
    }
    return (
        <div style={{ width: "90%", margin: "auto" }}>
            <FlexDiv justifyContentCenter style={{ marginTop: "1rem" }}>
                <div style={{ fontSize: "1.3rem", color: "#f65000" }}>
                    Update Master Configuration list
                </div>
            </FlexDiv>
            <div style={{ marginTop: "1rem" }}>
                <Table hoverRow>
                    <thead>
                        <tr>
                            <th style={{ width: "12%" }}>Role Name</th>
                            <th style={{ width: "20%" }}>Module Name</th>
                            <th style={{ width: "12%" }}>Page Name</th>
                            <th style={{ width: "12%" }}>Rank</th>
                            <th style={{ width: "12%" }}>Display Sequence</th>
                            <th style={{ width: "12%" }}>Is Bottom</th>
                            <th style={{ width: "12%" }}>Is Menu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ width: "12%" }}>{Data.roleName}</td>
                            <td style={{ width: "20%" }}>{Data.moduleName}</td>
                            <td style={{ width: "12%" }}>{Data.pageName}</td>
                            <td style={{ width: "12%" }}>{Data.rankCode}</td>
                            <td style={{ width: "12%" }}>
                                <Input
                                    placeholder="display order"
                                    value={updateConfiglist?.prioritySeq}
                                    onChange={(e) => {
                                        setUpdateConfigList({
                                            ...updateConfiglist,
                                            prioritySeq: e?.target?.value
                                        })
                                    }}
                                />
                            </td>
                            <td style={{ width: "12%" }}>
                                <Switch
                                    checked={updateConfiglist?.isBottomMenu}
                                    onChange={(e) => {
                                        setUpdateConfigList({
                                            ...updateConfiglist,
                                            isBottomMenu: e?.target?.checked
                                        })
                                    }}
                                /></td>
                            <td style={{ width: "12%" }}>
                                <Switch
                                    checked={updateConfiglist?.isMenu}
                                    onChange={(e) => {
                                        setUpdateConfigList({
                                            ...updateConfiglist,
                                            isMenu: e?.target?.checked
                                        })
                                    }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <FlexDiv style={{ marginTop: "1rem" }} justifyContentFlexEnd>
                <Button
                    variant="contained"
                    color="success"
                    onClick={updateList}
                    disabled={isEnabled()}
                >
                    Submit{" "}
                </Button>
            </FlexDiv>
            <Loader variant="m" isLoading={loader.isLoading} />
            <MsgCard
                style={{
                    container: {
                        width: "20%",
                    },
                }}
                msg={loader?.msg}
                variant={loader?.error ? "danger" : "success"}
                ghost
                card
            />
        </div>
    )
}

export default UpdateMasterConfigurationList
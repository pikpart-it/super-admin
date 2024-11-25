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
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

const style = {
    position: 'absolute' as 'absolute',
    top: '53%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "95%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}
const UpdateMasterConfigurationList = ({ data, open, setEditModalOpen, getConfigList }) => {
    const Data = data
    const [loader, setloader] = useState({
        isLoading: false,
        error: false,
        msg: "",
    });
    const [updateConfiglist, setUpdateConfigList] = useState<any>({
        prioritySeq: Data?.prioritySeq,
        bottomNo: Data?.bottomNo,
        menuNo: Data?.menuNo,
        isBottomMenu: Data?.isBottomMenu,
        isMenu: Data?.isMenu,
        isHomeTile: Data?.isHomeTile,
        homeTileName: Data?.homeTileName,
        bottomMenuName: Data?.bottomMenuName,
        menuName: Data?.menuName
    })
    const updateList = async () => {
        setloader({ ...loader, isLoading: true });
        let url = `${config.baseUrl}/superAdmin/updateMasterConfigurationPriority`
        const { prioritySeq, isBottomMenu, isMenu, bottomNo, menuNo, isHomeTile, homeTileName, bottomMenuName, menuName } = updateConfiglist
        const body = {
            id: Data?.id,
            seq_no: parseInt(prioritySeq),
            bottom_no: parseInt(bottomNo),
            menu_no: parseInt(menuNo),
            is_menu: isMenu,
            is_bottom_menu: isBottomMenu,
            is_home_tile: isHomeTile,
            home_tile_name: homeTileName,
            bottom_menu_name: bottomMenuName,
            menu_name: menuName,
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
                setEditModalOpen(false)
                getConfigList()
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
    return (
        <div style={{ width: "95%", margin: "auto" }}>
            <Modal
                open={open}
                onClose={() => {
                    setEditModalOpen(open)
                }}>
                <Box
                    sx={style}>
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
                                    {/* <th style={{ width: "20%" }}>Module Name</th>
                            <th style={{ width: "12%" }}>Page Name</th> */}
                                    <th style={{ width: "12%" }}>Rank</th>
                                    <th style={{ width: "12%" }}>Home Tile Order</th>
                                    <th style={{ width: "12%" }}>Bottom Menu Order</th>
                                    <th style={{ width: "12%" }}>Menu Order</th>
                                    <th style={{ width: "12%" }}>Is Home Tile</th>
                                    <th style={{ width: "12%" }}>Is Bottom</th>
                                    <th style={{ width: "12%" }}>Is Menu</th>
                                    <th style={{ width: "12%" }}>Home TileName</th>
                                    <th style={{ width: "12%" }}>Bottom Menu Name</th>
                                    <th style={{ width: "12%" }}>Menu Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ width: "12%" }}>{Data.roleName}</td>
                                    {/* <td style={{ width: "20%" }}>{Data.moduleName}</td>
                            <td style={{ width: "12%" }}>{Data.pageName}</td> */}
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
                                        <Input
                                            placeholder="bottom menu order"
                                            value={updateConfiglist?.bottomNo}
                                            onChange={(e) => {
                                                setUpdateConfigList({
                                                    ...updateConfiglist,
                                                    bottomNo: e?.target?.value
                                                })
                                            }}
                                        />
                                    </td>
                                    <td style={{ width: "12%" }}>
                                        <Input
                                            placeholder="menu order"
                                            value={updateConfiglist?.menuNo}
                                            onChange={(e) => {
                                                setUpdateConfigList({
                                                    ...updateConfiglist,
                                                    menuNo: e?.target?.value
                                                })
                                            }}
                                        />
                                    </td>

                                    {/* ///SwicthButton */}
                                    <td style={{ width: "12%" }}>
                                        <Switch
                                            checked={updateConfiglist?.isHomeTile}
                                            onChange={(e) => {
                                                setUpdateConfigList({
                                                    ...updateConfiglist,
                                                    isHomeTile: e?.target?.checked
                                                })
                                            }}
                                        /></td>
                                    <td style={{ width: "12%" }}>
                                        <Switch
                                            checked={updateConfiglist?.isBottomMenu}
                                            onChange={(e) => {
                                                setUpdateConfigList({
                                                    ...updateConfiglist,
                                                    isBottomMenu: e?.target?.checked
                                                })
                                            }}
                                        />
                                    </td>
                                    <td style={{ width: "12%" }}>
                                        <Switch
                                            checked={updateConfiglist?.isMenu}
                                            onChange={(e) => {
                                                setUpdateConfigList({
                                                    ...updateConfiglist,
                                                    isMenu: e?.target?.checked
                                                })
                                            }}
                                        /></td>

                                    {/* //Names */}
                                    <td style={{ width: "12%" }}>
                                        <Input
                                            placeholder="home tile name"
                                            value={updateConfiglist?.homeTileName}
                                            onChange={(e) => {
                                                setUpdateConfigList({
                                                    ...updateConfiglist,
                                                    homeTileName: e?.target?.value
                                                })
                                            }}
                                        />
                                    </td>
                                    <td style={{ width: "12%" }}>
                                        <Input
                                            placeholder="bottom menu name"
                                            value={updateConfiglist?.bottomMenuName}
                                            onChange={(e) => {
                                                setUpdateConfigList({
                                                    ...updateConfiglist,
                                                    bottomMenuName: e?.target?.value
                                                })
                                            }}
                                        />
                                    </td>
                                    <td style={{ width: "12%" }}>
                                        <Input
                                            placeholder="menu name"
                                            value={updateConfiglist?.menuName}
                                            onChange={(e) => {
                                                setUpdateConfigList({
                                                    ...updateConfiglist,
                                                    menuName: e?.target?.value
                                                })
                                            }}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <FlexDiv style={{ marginTop: "1rem" }} justifyContentFlexEnd>
                        <Button onClick={() => {
                            setEditModalOpen(false)
                        }}>Cancel</Button>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={updateList}
                        >
                            Submit{" "}
                        </Button>
                    </FlexDiv>
                </Box>
            </Modal>

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
import { Table } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useCallback, useEffect, useState } from 'react';
import SupportDialog from '~/components/supportDialog';
import { getList, getListByQuery } from '~/services/supportService';
import { columns } from '~/configs/columnSupport';
import useDebounce from '~/hook/useDebounce';

export default function ManageSupport() {
    const [supportRequests, setSupportRequests] = useState([]);
    const [detailRequest, setDetailRequest] = useState();
    const [query, setQuery] = useState('');

    const debouncedValue = useDebounce(query, 500);

    const getSupportRequests = useCallback(async () => {
        try {
            let res;
            if (debouncedValue.trim() === '') {
                res = await getList();
            } else {
                res = await getListByQuery(debouncedValue);
            }

            const data = res.map((item) => {
                return {
                    subject: item.title,
                    name: item.user.name,
                    id: item.user.id,
                    createdAt: item.createdAt.substring(0, 10),
                    updatedAt: item.updatedAt.substring(0, 10),
                    description: item.description,
                    adminResponse: item.reply,
                    projectId: item.id,
                    isReplied: item.isReplied,
                };
            });
            setSupportRequests(data);
        } catch (error) {}
    }, [debouncedValue]);

    useEffect(() => {
        getSupportRequests();
    }, [getSupportRequests]);

    const handleRowClick = (record, rowIndex) => {
        setDetailRequest(record);
    };

    const handleCloseDialog = () => {
        setDetailRequest(null);
    };
    return (
        <div className="h-full">
            <Search
                className="my-[20px]"
                placeholder="Search issue or description"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
            />
            <Table
                pagination={{ pageSize: 20 }}
                dataSource={supportRequests}
                columns={columns}
                onRow={(record, rowIndex) => ({
                    onClick: () => handleRowClick(record, rowIndex),
                })}
            />
            <SupportDialog
                detailRequest={detailRequest}
                closeDialog={handleCloseDialog}
                getSupportRequests={getSupportRequests}
            />
        </div>
    );
}

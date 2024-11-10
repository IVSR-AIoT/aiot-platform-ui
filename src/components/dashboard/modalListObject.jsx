import { List, Modal } from 'antd';

export default function ModalListObject({ detailMessage, openModal, setOpenModal }) {
    const dataSource = detailMessage?.object_list.map((item, index) => {
        if (item.Human) {
            return {
                type: 'Human',
                key: index,
                id: item.Human.id,
                age: item.Human.age,
                gender: item.Human.gender,
                href: item.Human.image_URL || item.image_URL,
                topLeftX: item.Human.bbox.topleftx,
                topLeftY: item.Human.bbox.toplefty,
                bottomRightX: item.Human.bbox.bottomrightx,
                bottomRightY: item.Human.bbox.bottomrighty,
            };
        } else {
            return {
                key: index,
                id: item.Vehicle.id,
                href: item.Vehicle.image_URL || item.image_URL,
                type: item.Vehicle.type,
                brand: item.Vehicle.brand,
                color: item.Vehicle.color,
                licence: item.Vehicle.Licence,
                topLeftX: item.Vehicle.bbox.topleftx,
                topLeftY: item.Vehicle.bbox.toplefty,
                bottomRightX: item.Vehicle.bbox.bottomrightx,
                bottomRightY: item.Vehicle.bbox.bottomrighty,
            };
        }
    });

    const handleOk = () => {
        setOpenModal(false);
        console.log(dataSource);
    };
    const handleCancel = () => {
        setOpenModal(false);
    };
    return (
        <Modal
            width={600}
            open={openModal}
            onOk={handleOk}
            onCancel={handleCancel}
            title={<p className="text-center text-[24px]">Detail Message</p>}
        >
            <List
                dataSource={dataSource}
                renderItem={(item) => {
                    return (
                        <List.Item
                            key={item.id}
                            /* extra={<img width={272} alt="logo" src={item.image_URL} />} */
                        >
                            <div>
                                {item.type === 'Human' ? (
                                    <div className="grid grid-cols-4 place-content-center gap-4">
                                        <p>
                                            <label>Type:</label> {item.type}
                                        </p>
                                        <p>
                                            <label>Age:</label> {item.age}
                                        </p>
                                        <p>
                                            <label>Gender:</label> {item.gender}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-4 place-content-center gap-4">
                                        <p>
                                            <label>Type:</label> {item.type}
                                        </p>
                                        <p>
                                            <label>Brand:</label> {item.brand}
                                        </p>
                                        <p>
                                            <label>Color:</label> {item.color}
                                        </p>
                                        <p>
                                            <label>Licence:</label> {item.licence}
                                        </p>
                                    </div>
                                )}
                                <div className="grid grid-cols-4 place-content-center gap-4">
                                    <p>
                                        <label>topLeftX:</label> {item.topLeftX}
                                    </p>
                                    <p>
                                        <label>topLeftY:</label> {item.topLeftY}
                                    </p>
                                    <p>
                                        <label>bottomRightX:</label> {item.bottomRightX}
                                    </p>
                                    <p>
                                        <label>bottomRightY:</label> {item.bottomRightY}
                                    </p>
                                </div>
                            </div>
                        </List.Item>
                    );
                }}
            />
        </Modal>
    );
}

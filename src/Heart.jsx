import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { onValue, orderByChild, query, ref } from "firebase/database";
import { Modal, Table } from "antd";
import { CiLogout } from "react-icons/ci";
function Heart() {
  const navigate = useNavigate();
  const [hearts, setHearts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHeart, setSelectedHeart] = useState(null);

  const showModal = (heart) => {
    setSelectedHeart(heart);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onValue(
      query(ref(db), orderByChild("timestamp")),
      (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          const heartArray = Object.values(data).sort(
            (a, b) => b.timestamp - a.timestamp
          );

          setHearts(heartArray);
        }
      }
    );

    return () => unsubscribe();
  }, []);
  const dataSource = hearts.map((heart) => ({
    key: heart.uuid,
    currentDate: heart.currentDate,
    heart: heart.heart,
  }));
  const columns = [
    {
      title: "Date",
      dataIndex: "currentDate",
      key: "currentDate",
      width: "20%",
    },
    {
      title: "Heart",
      dataIndex: "heart",
      key: "heart",
      width: "80%",
      render: (text, record) => (
        <div
          className="cursor-pointer overflow-hidden line-clamp-3"
          onClick={() => showModal(record)}
        >
          {text}
        </div>
      ),
    },
  ];
  return (
    <div className="bg-color_1 h-screen w-full relative p-20">
      <div className="bg-white w-2/4 mx-auto p-8 rounded-[20px] shadow-box_shadow_1">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      </div>
      <Modal
        title="Heart"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedHeart && (
          <div>
            <p>{selectedHeart.heart}</p>
          </div>
        )}
      </Modal>
      <button  onClick={logout}>
        <CiLogout className="text-[30px] " />
      </button>
    </div>
  );
}

export default Heart;

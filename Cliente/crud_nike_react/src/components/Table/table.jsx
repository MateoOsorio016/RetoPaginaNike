import React, { useState } from 'react';
import { IoAddCircleOutline, IoEye   } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import { FaTrash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import {Button} from '../button/button';
import './table.css';

export const Table = ({
  data,
  columns,
  dbColumns,
  title,
  label,
  createLink = '/',
  createText,
  editButton = true,
  editLink = 'edit',
  alternativeStyle = false,
  deleteFunction,
  detailFunction,
  buttonsActions,
  tituloDocumento,
  nombreArchivo,
}) => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('');

  const handleSearch = (e) => {
    setSearchType(e.target.value);
  };

  let dataTable = [];

  if (searchType !== '') {
    dataTable = data.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchType.toLowerCase())
      )
    );
  } else {
    dataTable = data;
  }

  return (
    <>
      {title && <h1>{title}</h1>}
      <div className='tableContainer'>
        {!alternativeStyle && (
          <div className='actionsTable'>
            <div className='left'>
              <Link to={createLink} className='createButton'>
                {createText ? (
                  <>
                    <IoAddCircleOutline size={30}/> 
                  </>
                ) : (
                  <>
                    <IoAddCircleOutline/> Crear Nuevo
                  </>
                )}
              </Link>
            </div>
          </div>
        )}
        <div className='bottomTable'>
          <table
            className={`${alternativeStyle ? 'datatable--alternativeStyle' : 'dataTable'}`}
          >
            <thead>
              <tr>
                {columns?.map((column) => (
                  <th key={column}>{column}</th>
                ))}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dataTable.length === 0 && searchType ? (
                <tr>
                  <td colSpan={columns.length + 1}>No hay resultados</td>
                </tr>
              ) : (
                dataTable.map((row, index) => (
                  <tr key={index}>
                    {dbColumns?.map((column) => (
                      <td key={column}>{column === 'id' ? (index + 1) : row[column]}</td>
                    ))}
                    <td className='dataTable__actions'>
                      {buttonsActions?.map((button) => (
                        <Button
                          key={button.text + index}
                          text={button.text}
                          onClick={() => button.onClick(row.id)}
                          fill={button.fill}
                        />
                      ))}
                      {editButton && (
                        <Button
                          text="Editar"
                          onClick={() => navigate(`${editLink}/${row.id}`)}
                          fill={true}
                          icon={<CiEdit/>}
                        />
                      )}
                      <Button
                      text="Detalle"
                      onClick={() => detailFunction && detailFunction(row)}
                      fill={true}
                      icon={<IoEye/>}
                      />
                      <Button
                        text="Eliminar"
                        onClick={() => deleteFunction && deleteFunction(row.id)}
                        fill={false}
                        icon={<FaTrash />}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

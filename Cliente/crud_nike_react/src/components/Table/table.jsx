import React, { useState, useMemo } from 'react';
import { IoAddCircleOutline, IoEye } from 'react-icons/io5';
import { IoIosAdd, IoIosSad, IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { CiEdit } from 'react-icons/ci';
import { FaTrash } from "react-icons/fa6";
import { FaBan } from 'react-icons/fa6';
import { FaSwift } from 'react-icons/fa6';
import Switch from '@mui/material/Switch';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../button/button';
import './table.css';
import { set } from 'react-hook-form';

export const Table = ({
  data,
  columns,
  dbColumns,
  title,
  currentPage,
  totalPages,
  onChangePage,
  onSearch,
  onSortChange,
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
  const [searchTerm, setSearchTerm] = useState('');


  const handleSortAscending = () => {
    onSortChange('asc');
  };

  const handleSortDescending = () => {
    onSortChange('desc');
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };
  return (
    <>
      {title && <h1 className='title-table'>{title}</h1>}
      <div className='tableContainer'>
        {!alternativeStyle && (
          <div className='actionsTable'>
            <div className='left'>
              <button className='ButtonCreate-Table'>
                <Link to={createLink} className='createButton'>
                  {createText ? (
                    <>
                      <IoIosAdd size={29} color='white' /> {createText}
                    </>
                  ) : (
                    <>
                      <IoIosAdd /> Crear Nuevo
                    </>
                  )}
                </Link>
              </button>
            </div>
            <div className='search-container'>
              <input
                type='text'
                placeholder="Buscar..."
                onChange={handleSearchChange}
                value={searchTerm}
              />
            </div>
            <div className="filter">
              <Button
                text="ascendente"
                onClick={handleSortAscending}
                fill={true}
                icon={<IoIosArrowUp />}
              />
              <Button
                text="descendente"
                onClick={handleSortDescending}
                fill={true}
                icon={<IoIosArrowDown />}
              />
            </div>
          </div>
        )}
        <div className='bottomTable'>
          <table className={`${alternativeStyle ? 'datatable--alternativeStyle' : 'dataTable'}`}>
            <thead>
              <tr>
                {columns?.map((column) => (
                  <th key={column}>{column}
                  </th>
                ))}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1}>No hay resultados</td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr key={index} className={(row.state === false  || row.is_active === false) ? 'inactive-row' : ''}>
                    {dbColumns?.map((column) => (
                      <td key={column}>
                        {column === 'image' ? (
                          <img src={row[column]} style={{ width: '100px', height: 'auto' }} alt="Producto" />
                        ) : column === 'id' ? (
                          index + 1
                        ) : column === 'state' ? (
                          row[column] ? 'Activo' : 'Inactivo'
                        ) : column === 'is_active' ? (
                          row[column] === true ? 'Activo' : 'Inactivo'
                        ) : (
                          row[column]
                        )}
                      </td>
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
                      <Switch
                        checked={row.is_active || row.state}
                        onChange={() => deleteFunction && deleteFunction(row.id)}
                      />
                      {editButton && (
                        <Button
                          text="Editar"
                          onClick={() => navigate(`${editLink}/${row.id}`)}
                          fill={true}
                          icon={<CiEdit />}
                        />
                      )}
                      {detailFunction && (
                        <Button
                          text="Detalle"
                          onClick={() => detailFunction && detailFunction(row)}
                          fill={true}
                          icon={<IoEye />}
                        />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i + 1} onClick={() => onChangePage(i + 1)} className={`pagination-button ${currentPage === i + 1 ? 'pagination-button-active' : ''}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );

}



import React from 'react'

const Header = ({PageHeader, Subtext}) => {
    return (
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-text">📦 {PageHeader}</h1>
            <p className="text-gray-600">{Subtext}</p>
        </div>
    )
}

export default Header
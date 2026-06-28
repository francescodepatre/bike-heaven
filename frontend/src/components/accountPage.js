/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState } from 'react';
import "./style/accountPage.css";
import DefaultAccount from './defaultAccount';
import MyDetails     from './myDetails';
import MyAddress     from './myAddress';
import MyData        from './myData';
import Help          from './Help';

const NAV_ITEMS = [
    { key: 'details',  label: 'My Details' },
    { key: 'address',  label: 'My Address' },
    { key: 'password', label: 'Password & Username' },
    { key: 'help',     label: 'About & Help' },
];

const VIEWS = {
    default:  <DefaultAccount />,
    details:  <MyDetails />,
    address:  <MyAddress />,
    password: <MyData />,
    help:     <Help />,
};

const AccountPage = () => {
    const [activeView, setActiveView] = useState('default');

    return (
        <div className="account_page">

            {/* ── Sidebar ── */}
            <aside className="account_sidebar">
                <h2 className="account_sidebar_title">Account Settings</h2>
                <nav aria-label="Account navigation">
                    <ul className="account_nav">
                        {NAV_ITEMS.map(({ key, label }) => (
                            <li key={key}>
                                <button
                                    className={`account_nav_item ${activeView === key ? 'is_active' : ''}`}
                                    onClick={() => setActiveView(key)}
                                    aria-current={activeView === key ? 'page' : undefined}
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* ── Contenuto ── */}
            <main className="account_content">
                {VIEWS[activeView] ?? VIEWS.default}
            </main>

        </div>
    );
};

export default AccountPage;
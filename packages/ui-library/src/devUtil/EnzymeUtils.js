import { mount } from "enzyme";


export const snapshotDataIds = node => {
    const elements = node.find("[data-id]").hostNodes(); // Find only actual HTML elements

    const ids = elements.map(element => element.prop("data-id"));
    expect(ids).toMatchSnapshot();
};

export const mountSnapshotDataIds = node => snapshotDataIds(mount(node));

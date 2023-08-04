
import os
import streamlit.components.v1 as components

_DEVELOP_MODE = os.getenv('DEVELOP_MODE')

if _DEVELOP_MODE:
    _component_func = components.declare_component(
        "streamlit-iframe-event",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/dist")
    _component_func = components.declare_component("streamlit-iframe-event", path=build_dir) # noqa


def st_iframe_event(url, key=None):
    params = {
        "url": url
    } # noqa
    return _component_func(key=key, **params) # noqa


if _DEVELOP_MODE:
    import streamlit as st
    event = st_iframe_event("http://localhost:8502", key="test")
    st.write(event)

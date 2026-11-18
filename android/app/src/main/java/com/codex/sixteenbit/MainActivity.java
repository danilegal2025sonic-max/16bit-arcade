package com.codex.sixteenbit;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(ImmersiveModePlugin.class);
        registerPlugin(ExternalBrowserPlugin.class);
        super.onCreate(savedInstanceState);
    }
}

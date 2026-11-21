package com.codex.sixteenbit;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@CapacitorPlugin(name = "ExternalBrowser")
public class ExternalBrowserPlugin extends Plugin {
    private static final Set<String> ALLOWED_HOSTS = new HashSet<>(Arrays.asList(
        "tabstationtoo.github.io",
        "vita3k.org",
        "web.libretro.com"
    ));

    @PluginMethod
    public void open(PluginCall call) {
        String value = call.getString("url");
        if (value == null) {
            call.reject("A URL externa está ausente.");
            return;
        }

        Uri uri = Uri.parse(value);
        if (!"https".equalsIgnoreCase(uri.getScheme()) || !ALLOWED_HOSTS.contains(uri.getHost())) {
            call.reject("A URL não está na lista de destinos externos permitidos.");
            return;
        }

        Activity activity = getActivity();
        if (activity == null) {
            call.reject("A atividade Android não está disponível.");
            return;
        }

        try {
            activity.startActivity(new Intent(Intent.ACTION_VIEW, uri));
            call.resolve();
        } catch (Exception error) {
            call.reject("Não foi possível abrir o link externo.", error);
        }
    }
}

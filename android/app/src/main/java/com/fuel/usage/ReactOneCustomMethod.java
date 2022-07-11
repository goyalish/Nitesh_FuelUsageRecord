package com.fuel.usage;

/**
 * Created by NiteshGoyal on 10/07/22.
 */

import android.annotation.SuppressLint;
import android.provider.Settings;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;

import java.util.Locale;

public class ReactOneCustomMethod extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    ReactOneCustomMethod(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "ReactOneCustomMethod";
    }

    @ReactMethod
    public void getPhoneID(Promise response) {
        try {
            @SuppressLint("HardwareIds") String id = Settings.Secure.getString(reactContext.getContentResolver(), Settings.Secure.ANDROID_ID);
            response.resolve(id);
        } catch (Exception e) {
            response.reject("Error", e);
        }
    }

    @ReactMethod
    public void getDeviceType(Promise response) {
        try {
            response.resolve("Android");
        } catch (Exception e) {
            response.reject("Error", e);
        }
    }

    @ReactMethod
    public void checkBalance(ReadableMap readableMap, Promise response) {
        int userMaxAllowance = readableMap.getInt("userMaxAllowance");
        int total = readableMap.getInt("total");
        if(total < userMaxAllowance) {
            response.resolve(true);
        } else {
            response.resolve(false);
        }
    }

    @ReactMethod
    public void getPhoneInfo(Promise response) {
        try {
            WritableMap map = Arguments.createMap();
            String ID = android.os.Build.ID;
            String MANUFACTURER = android.os.Build.MANUFACTURER;
            String DEVICE = android.os.Build.DEVICE;
            String MODEL = android.os.Build.MODEL;
            String OS_NAME = System.getProperty("os.name");
            String OS_VERSION = System.getProperty("os.version");
            String RELEASE = android.os.Build.VERSION.RELEASE;
            String versionName = BuildConfig.VERSION_NAME;
            int versionCode = BuildConfig.VERSION_CODE;
            String language = Locale.getDefault().getDisplayLanguage();

            map.putString("Id", ID);
            map.putString("Manufacturer", MANUFACTURER);
            map.putString("Device", DEVICE);
            map.putString("Model", MODEL);
            map.putString("OS_NAME", OS_NAME);
            map.putString("OS_VERSION", OS_VERSION);
            map.putString("Release", RELEASE);
            map.putString("versionName", versionName);
            map.putInt("versionCode", versionCode);
            map.putString("language", language);
            response.resolve(map);
        } catch (Exception e) {
            response.reject("Error", e);
        }
    }

    @ReactMethod
    public void getFuelData(Promise response) {
        int[] price = { 30, 40, 10 };
        String[] type = { "Petrol", "Diesel", "Battery Charge" };
        WritableArray data = Arguments.createArray();
        for (int i = 0; i < price.length; ++i) {
            WritableMap map = Arguments.createMap();
            map.putString("fuelType", type[i]);
            map.putInt("pricePerLiter", price[i]);
            data.pushMap(map);
        }
        WritableMap finalData = Arguments.createMap();
        finalData.putArray("data", data);
        finalData.putInt("userMaxAllowance", 600);
        response.resolve(finalData);
    }
}
